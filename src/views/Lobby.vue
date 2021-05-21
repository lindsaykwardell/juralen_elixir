<template>
  <GameQueue v-if="sub" :gameQueue="sub.gameQueue" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useSubscription, useMutation } from "@/graphql";
import GameQueue from "../components/lobby/GameQueue.vue";
import gql from "graphql-tag";
import { Game } from "@/types";

export default defineComponent({
  name: "App",
  setup() {
    const [joinLobby] = useMutation(gql`
      mutation JoinLobby {
        joinLobby
      }
    `);
    const { data: sub } = useSubscription<{ gameQueue: Game[] }>(gql`
      subscription GameQueue {
        gameQueue {
          uuid
          players {
            id
            name
          }
          settings {
            maxX
            maxY
            name
          }
        }
      }
    `);

    onMounted(() => setTimeout(joinLobby, 2000));

    return {
      sub,
    };
  },
  components: {
    GameQueue,
  },
});
</script>
