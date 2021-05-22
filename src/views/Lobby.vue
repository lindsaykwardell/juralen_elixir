<template>
  <div v-if="profile?.profile">
    <div class="flex text-white px-4 py-2">
      Welcome, {{ profile?.profile?.name }}!
    </div>
    <GameQueue v-if="sub" :gameQueue="sub.gameQueue" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useSubscription, useMutation } from "@/graphql";
import GameQueue from "../components/lobby/GameQueue.vue";
import gql from "graphql-tag";
import { Game } from "@/types";
import useProfile from "@/hooks/useProfile"

export default defineComponent({
  name: "App",
  setup() {
    const { profile } = useProfile();

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
      profile
    };
  },
  components: {
    GameQueue,
  },
});
</script>
