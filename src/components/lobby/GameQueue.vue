<template>
  <div class="flex flex-col">
    <GameQueueCard v-for="game in gameQueue" :key="game.uuid" :game="game" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameQueueCard from "./GameQueueCard.vue";

export default defineComponent({
  props: {
    gameQueue: {
      type: Array as () => {
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
      }[],
      default: () => [],
    },
  },
  components: {
    GameQueueCard,
  },
});
</script>
