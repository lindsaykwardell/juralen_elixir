import { useSubscription, useMutation } from "@/graphql";
import { Game } from "@/types";
import gql from "graphql-tag";
import { computed, ComputedRef } from "@vue/runtime-core";

export default (
  uuid: string | string[]
): {
  game: ComputedRef<Game | undefined>;
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

  return {
    game,
    joinGame: () => joinGame({ variables: { uuid } }),
    leaveGame: () => leaveGame({ variables: { uuid } }),
  };
};
