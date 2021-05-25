<template>
  <Container>
    {{ game }}
    <template v-if="game">
      <div class="flex p-4">
        <h1 class="text-3xl flex-grow">{{ game.settings.name }}</h1>
        <button
          class="border-2 border-red-500 px-4 py-2 hover:border-red-700 hover:bg-red-700 transition duration-75 rounded-full text-lg"
          @click="leaveGame"
        >
          Leave Game
        </button>
      </div>
      <div class="m-6 py-4 bg-gray-900">
        <div
          v-for="player in game.players"
          :key="player.uuid"
          class="grid grid-cols-10 hover:bg-gray-800 p-2"
        >
          <div class="col-span-3">{{ player.name }}</div>
          <div class="col-span-2">
            Is Human <input type="checkbox" checked disabled />
          </div>
          <div class="col-span-2">
            Analyzer
            <select class="bg-black p-1" disabled>
              <option selected>Default</option>
            </select>
          </div>
          <div class="col-span-2">
            <label>
              Color
            </label>
          </div>
          <div>
            <button>Remove Player</button>
          </div>
        </div>
      </div>
      <div class="p-4">
        <h2 class="text-2xl">Settings</h2>
        <hr class="w-full my-4" />
        <div class="flex">
          <div class="w-1/6 grid grid-cols-3 gap-y-2">
            <label for="gridWidth">
              Width
            </label>
            <input class="col-span-2" id="gridWidth" type="number" />
            <label for="gridHeight">
              Height
            </label>
            <input class="col-span-2" id="gridHeight" type="number" />
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import Container from "@/components/Container.vue";
import useGame from "@/hooks/useGame";

export default defineComponent({
  setup() {
    const uuid = useRoute().params.uuid;
    const { game, joinGame, leaveGame } = useGame(uuid);
    const router = useRouter();

    setTimeout(() => {
      joinGame();
    }, 2000);

    onBeforeUnmount(() =>
      process.env.NODE_ENV === "production" ? leaveGame() : null
    );

    return {
      game,
      leaveGame: () =>
        leaveGame().then(() =>
          router.push({
            name: "Lobby",
          })
        ),
    };
  },
  components: {
    Container,
  },
});
</script>
