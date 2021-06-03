<template>
  <select :value="value" class="p-2 ml-3 rounded w-32" :class="bgClass">
    <option value="red">Red</option>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="orange">Orange</option>
    <option value="teal">Teal</option>
    <option value="yellow">Yellow</option>
    <option value="purple">Purple</option>
    <option value="gray">Gray</option>
  </select>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import usePlayerColor from "@/hooks/usePlayerColor";

export default defineComponent({
  props: {
    value: {
      type: String,
    },
  },
  setup(props) {
    const bgClass = computed(() => usePlayerColor(props.value || ""));

    return {
      bgClass,
    };
  },
});
</script>
