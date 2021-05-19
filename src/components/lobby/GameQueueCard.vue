<template>
  <button class="py-2 px-4 mx-8 shadow my-1 hover:bg-gray-100 flex">
    <div class="w-20 border-r border-black">
      ( {{ game.settings.maxX + 1 }} x {{ game.settings.maxY + 1 }} )
    </div>
    <div class="flex-grow text-left px-3">{{ game.settings.name }}</div>
    <div>{{ game.players.length }}/8 Players</div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
});
</script>
