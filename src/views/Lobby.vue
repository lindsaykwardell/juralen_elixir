<template>
  <Container v-if="profile?.profile">
    <div class="flex text-white px-4 py-2">
      <div class="flex-grow">Welcome, {{ profile?.profile?.name }}!</div>
      <div class="flex">
        <a href="#" class="px-4 hover:underline text-lg">Home</a>
        <a href="#" class="px-4 hover:underline text-lg">Settings</a>
      </div>
    </div>
    <hr class="w-full" />
    <div class="flex lobby-contents">
      <div class="w-2/3">
        <div class="flex m-4">
          <button
            class="bg-blue-500 px-4 py-2 hover:bg-blue-700 transition duration-75 rounded-full text-lg text-white w-44"
            @click="startGameHandler"
          >
            Start Game
          </button>
          <input
            v-model="gameName"
            type="text"
            class="p-1 flex-grow ml-4"
            placeholder="Game Name"
            aria-label="Game Name"
          />
        </div>
        <GameQueue v-if="sub" :gameQueue="sub.gameQueue" />
      </div>
      <div class="w-1/3 flex flex-col border-l border-white">
        <div class="flex-grow">Stuff goes here</div>
        <div class="h-1/3">
          <h2 class="text-center text-2xl">Chat Room</h2>
          <div class="h-full bg-white">Hello, there</div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useSubscription, useMutation } from "@/graphql";
import GameQueue from "../components/lobby/GameQueue.vue";
import Container from "@/components/Container.vue";
import gql from "graphql-tag";
import { Game } from "@/types";
import useProfile from "@/hooks/useProfile";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const { profile } = useProfile();
    const gameName = ref("");
    const router = useRouter();

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
            started
          }
        }
      }
    `);

    const [startGame] = useMutation<{
      createGame: Game;
    }>(gql`
      mutation CreateGame($name: String) {
        createGame(name: $name) {
          uuid
        }
      }
    `);

    const startGameHandler = () =>
      startGame({ variables: { name: gameName.value } }).then((res) =>
        router.push({
          name: "Game",
          params: {
            uuid: res.createGame.uuid,
          },
        })
      );

    onMounted(() => setTimeout(joinLobby, 2000));

    return {
      sub,
      profile,
      gameName,
      startGameHandler,
    };
  },
  components: {
    GameQueue,
    Container,
  },
});
</script>

<style lang="postcss" scoped>
.lobby-contents {
  height: calc(100% - 44px);
}
</style>
