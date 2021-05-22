<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useGraphql } from "@/graphql";

export default defineComponent({
  setup() {
    useGraphql();
  },
});
</script>
