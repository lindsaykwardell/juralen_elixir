<template>
  <div class="flex flex-col h-screen">
    <div class="splash" />
    <div
      class="fixed h-screen w-screen flex flex-col justify-center items-center bg-black-75"
    >
      <hr />
      <h1 class="text-white my-4 font-stoke">JURALEN</h1>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import useProfile from "@/hooks/useProfile"

export default defineComponent({
  setup() {
    const router = useRouter();
    const { profile, login } = useProfile()

    // setTimeout(() => {
    //   router.push({
    //     name: "Lobby",
    //   });
    // }, 2000);

    return {
      login
    }
  },
});
</script>
