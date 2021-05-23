<template>
  <Container>
    {{ data }}
  </Container>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { useSubscription, useMutation } from "@/graphql";
import { Game } from "@/types";
import gql from "graphql-tag";
import { useRoute } from "vue-router";
import Container from "@/components/Container.vue";

export default defineComponent({
  setup() {
    const uuid = useRoute().params.uuid;

    const { data } = useSubscription<{ updatedGame: Game }>(
      gql`
        subscription GameData($uuid: String) {
          updatedGame(uuid: $uuid) {
            uuid
            settings {
              maxX
              maxY
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

    setTimeout(() => {
      joinGame({ variables: { uuid } });
    }, 1);

    onBeforeUnmount(() =>
      process.env.NODE_ENV === "production"
        ? leaveGame({ variables: { uuid } })
        : null
    );

    return {
      data,
    };
  },
  components: {
    Container,
  },
});
</script>
