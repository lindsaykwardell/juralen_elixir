import { useSubscription, useMutation } from "@/graphql";
import { Game, Settings } from "@/types";
import gql from "graphql-tag";
import { computed, ComputedRef, watch } from "@vue/runtime-core";
import { reactive, Ref, ref } from "vue";
import { debouncedWatch } from '@vueuse/core'


export default (
  uuid: string | string[]
): {
  game: ComputedRef<Game | undefined>;
  settings: Settings;
  joinGame: () => Promise<{ joinGame: Game }>;
  leaveGame: () => Promise<{ leaveGame: Game }>;
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
          }
          grid {
            x
            y
            cellType
            defBonus
            structure
          }
        }
      }
    `,
    {
      uuid,
    }
  );

  const game = computed(() => data.value?.updatedGame);
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

  const [updateSettings] = useMutation(gql`
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

  debouncedWatch(settings, () => {
    if (!refreshingSettings.value && settings.maxX && settings.maxY) {
      updateSettings({
        variables: {
          uuid,
          settings: { ...settings, maxX: +settings.maxX, maxY: +settings.maxY },
        },
      });
    }
  }, {
    debounce: 500
  });

  return {
    game,
    settings,
    joinGame: () => joinGame({ variables: { uuid } }),
    leaveGame: () => leaveGame({ variables: { uuid } }),
  };
};
