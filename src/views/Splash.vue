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
        <Login
          v-if="mode === Mode.LOGIN"
          v-model:email="email"
          v-model:password="password"
          @loginHandler="loginHandler"
        />
        <Register
          v-else
          v-model:name="name"
          v-model:email="email"
          v-model:password="password"
          @registerHandler="registerHandler"
        />
        <button
          class="m-auto italic hover:text-blue-300 underline text-sm block mt-4 transition duration-75"
          @click="toggleMode"
        >
          {{
            mode === Mode.LOGIN
              ? "Register new account"
              : "Sign in with existing account"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useProfile from "@/hooks/useProfile";
import Login from "@/components/splash/Login.vue";
import Register from "@/components/splash/Register.vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { profile, login, register } = useProfile();

    enum Mode {
      LOGIN,
      REGISTER,
    }

    const email = ref("");
    const password = ref("");
    const name = ref("");
    const mode = ref<Mode>(Mode.LOGIN);

    const toggleMode = () => {
      switch (mode.value) {
        case Mode.LOGIN:
          return (mode.value = Mode.REGISTER);
        case Mode.REGISTER:
          return (mode.value = Mode.LOGIN);
      }
    };

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

    const registerHandler = () => {
      register(name.value, email.value, password.value)
        .then(loginHandler)
        .catch(() => alert("Could not register!"));
    };

    setTimeout(() => {
      if (profile.value?.profile)
        router.push({
          name: "Lobby",
        });
    }, 2000);

    return {
      name,
      email,
      password,
      mode,
      Mode,
      toggleMode,
      loginHandler,
      registerHandler,
    };
  },
  components: {
    Login,
    Register,
  },
});
</script>
