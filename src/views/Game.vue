<template>
  <div>
    {{ data }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSubscription, useMutation } from "@/graphql";
import { Game } from "@/types";
import gql from "graphql-tag";
import { useRoute } from "vue-router";

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

    return {
      data,
    };
  },
});
</script>
