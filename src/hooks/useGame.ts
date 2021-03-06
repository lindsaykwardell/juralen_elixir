import { useSubscription, useMutation } from "@/graphql";
import { Cell, Game, Player, Settings, Unit } from "@/types";
import gql from "graphql-tag";
import { computed, ComputedRef, watch } from "@vue/runtime-core";
import { reactive, ref } from "vue";
import { debouncedWatch } from "@vueuse/core";
import naturalOrder from "natural-order";

export default (
  uuid: string | string[]
): {
  game: ComputedRef<Game | undefined>;
  players: ComputedRef<Player[] | undefined>;
  grid: ComputedRef<Cell[][] | undefined>;
  units: ComputedRef<Unit[] | undefined>;
  settings: Settings;
  joinGame: () => Promise<{ joinGame: Game }>;
  leaveGame: () => Promise<{ leaveGame: Game }>;
  startGame: () => Promise<{ startGame: Game }>;
} => {
  const { data } = useSubscription<{ updatedGame: Game }>(
    gql`
      subscription GameData($uuid: String) {
        updatedGame(uuid: $uuid) {
          uuid
          settings {
            maxX
            maxY
            name
            started
          }
          players {
            uuid
            id
            name
            resources {
              actions
              gold
            }
            hasLost
            isHuman
            analyzer
            color
            score
            techTree
          }
          grid {
            x
            y
            cellType
            defBonus
            structure
            controlledBy
          }
          units {
            uuid
            unitType
            movesLeft
            attack
            health
            range
            controlledBy
            x
            y
          }
        }
      }
    `,
    {
      uuid,
    }
  );

  const game = computed(() => data.value?.updatedGame);
  const players = computed(() =>
    [...(data.value?.updatedGame.players || [])].reverse()
  );
  const grid = computed(() =>
    naturalOrder(data.value?.updatedGame.grid || [])
      .with({ blankAtTop: true })
      .sort(["y", "x"])
      .reduce((grid: Cell[][], cell: Cell) => {
        if (grid[cell.y]) {
          grid[cell.y].push(cell);
        } else {
          grid[cell.y] = [cell];
        }

        return grid;
      }, [])
  );
  const units = computed(() =>
    data.value?.updatedGame.units.map((unit) => ({
      ...unit,
      shortType: (() => {
        switch (unit.unitType) {
          case "Soldier":
            return "So";
          case "Warrior":
            return "Wa";
          case "Archer":
            return "Ar";
          case "Knight":
            return "Kn";
          case "Rogue":
            return "Ro";
          case "Wizard":
            return "Wi";
          case "Priest":
            return "Pr";
          default:
            return "??";
        }
      })(),
    }))
  );
  const settings = reactive<Settings>({
    maxX: 8,
    maxY: 8,
    name: "",
  });
  const refreshingSettings = ref(false);

  watch(game, () => {
    if (game.value?.settings) {
      refreshingSettings.value = true;
      const { maxX, maxY, name } = game.value.settings;
      settings.maxX = maxX;
      settings.maxY = maxY;
      settings.name = name;
      refreshingSettings.value = false;
    }
  });

  const [joinGame] = useMutation<{ joinGame: Game }>(gql`
    mutation JoinGame($uuid: String!) {
      joinGame(uuid: $uuid) {
        uuid
      }
    }
  `);

  const [leaveGame] = useMutation<{ leaveGame: Game }>(gql`
    mutation LeaveGame($uuid: String!) {
      leaveGame(uuid: $uuid) {
        uuid
      }
    }
  `);

  const [updateSettings] = useMutation<{ updateGameSettings: Game }>(gql`
    mutation UpdateSettings($uuid: String!, $settings: InputSettings!) {
      updateGameSettings(uuid: $uuid, settings: $settings) {
        uuid
        settings {
          maxX
          maxY
          name
        }
      }
    }
  `);

  const [startGame] = useMutation<{ startGame: Game }>(gql`
    mutation StartGame($uuid: String!) {
      startGame(uuid: $uuid) {
        uuid
      }
    }
  `);

  debouncedWatch(
    settings,
    () => {
      if (!refreshingSettings.value && settings.maxX && settings.maxY) {
        updateSettings({
          variables: {
            uuid,
            settings: {
              ...settings,
              maxX: +settings.maxX,
              maxY: +settings.maxY,
            },
          },
        });
      }
    },
    {
      debounce: 500,
    }
  );

  return {
    game,
    players,
    grid,
    units,
    settings,
    joinGame: () => joinGame({ variables: { uuid } }),
    leaveGame: () => leaveGame({ variables: { uuid } }),
    startGame: () => startGame({ variables: { uuid } }),
  };
};
