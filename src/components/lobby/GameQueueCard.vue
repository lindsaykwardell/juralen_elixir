<template>
  <button
    class="py-2 px-4 mx-8 shadow my-1 bg-gray-200 hover:bg-gray-400 transition duration-50 flex"
    @click="joinGame"
  >
    <div class="w-20 border-r border-black">
      ( {{ game.settings.maxX + 1 }} x {{ game.settings.maxY + 1 }} )
    </div>
    <div class="flex-grow text-left px-3">{{ game.settings.name }}</div>
    <div>{{ game.players.length }}/8 Players</div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    game: {
      type: Object as () => {
        uuid: string;
        players: {
          id: number;
          name: string;
        }[];
        settings: {
          maxX: number;
          maxY: number;
          name: string;
        };
      },
      default: () => ({}),
    },
  },
  setup(props) {
    const router = useRouter();

    const joinGame = () => {
      console.log("Joining!", props.game.uuid)
      router.push({
        name: "Game",
        params: {
          uuid: props.game.uuid,
        },
      });
    };

    return {
      joinGame,
    };
  },
});
</script>
