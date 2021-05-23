<template>
  <div v-if="profile?.profile" class="xl:w-[1200px] m-auto shadow-xl h-[90vh] my-[5vh] bg-black-50">
    <div class="flex text-white px-4 py-2">
      <div class="flex-grow">Welcome, {{ profile?.profile?.name }}!</div>
      <div class="flex">
        <a href="#" class="px-4 hover:underline text-lg">Home</a>
        <a href="#" class="px-4 hover:underline text-lg">Settings</a>
      </div>
    </div>
    <hr class="w-full" />
    <div class="flex lobby-contents">
      <GameQueue v-if="sub" :gameQueue="sub.gameQueue" class="w-2/3" />
      <div class="w-1/3 flex flex-col border-l border-white">
        <div class="flex-grow">Stuff goes here</div>
        <div class="h-1/3">
          <h2 class="text-center text-2xl">Chat Room</h2>
          <div class="h-full bg-white">Hello, there</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useSubscription, useMutation } from "@/graphql";
import GameQueue from "../components/lobby/GameQueue.vue";
import gql from "graphql-tag";
import { Game } from "@/types";
import useProfile from "@/hooks/useProfile";

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
      profile,
    };
  },
  components: {
    GameQueue,
  },
});
</script>

<style lang="postcss" scoped>
.lobby-contents {
  height: calc(100% - 44px);
}
</style>