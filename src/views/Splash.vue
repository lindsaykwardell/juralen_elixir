<template>
  <div class="flex flex-col h-screen">
    <div class="splash" />
    <div
      class="fixed h-screen w-screen flex flex-col justify-center items-center bg-black-75"
    >
      <hr />
      <h1 class="text-white my-4 font-stoke">JURALEN</h1>
      <hr />
      <div
        class="w-80 bg-black-75 text-white p-4 rounded shadow mt-4 text-left"
      >
        <h2 class="text-center">Sign In</h2>
        <hr class="w-full" />
        <form @submit.prevent="loginHandler">
          <label class="py-2 block">
            Email
            <input
              v-model="email"
              type="email"
              required
              class="w-full p-1 text-black"
            />
          </label>
          <label class="py-2 block">
            Password
            <input
              v-model="password"
              type="password"
              required
              class="w-full p-1 text-black"
            />
          </label>
          <button
            class="bg-blue-500 px-4 py-2 hover:bg-blue-700 transition duration-75 rounded-full m-auto block text-lg"
          >
            Enter the Game
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useProfile from "@/hooks/useProfile";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { profile, login } = useProfile();

    const email = ref("");
    const password = ref("");

    setTimeout(() => {
      if (profile)
        router.push({
          name: "Lobby",
        });
    }, 2000);

    const loginHandler = () => {
      login(email.value, password.value)
        .then(() => {
          router.push({
            name: "Lobby",
          });
        })
        .catch(() => {
          alert("Could not sign in!");
        });
    };

    return {
      email,
      password,
      loginHandler,
    };
  },
});
</script>
