<template>
  <h2 class="text-center">Register</h2>
  <hr class="w-full" />
  <form @submit.prevent="registerHandler">
    <label class="py-2 block">
      Username
      <input
        v-model="name_"
        type="text"
        required
        class="w-full p-1 text-black"
      />
    </label>
    <label class="py-2 block">
      Email
      <input
        v-model="email_"
        type="email"
        required
        class="w-full p-1 text-black"
      />
    </label>
    <label class="py-2 block">
      Password
      <input
        v-model="password_"
        type="password"
        required
        class="w-full p-1 text-black"
      />
    </label>
    <button
      class="bg-blue-500 px-4 py-2 hover:bg-blue-700 transition duration-75 rounded-full m-auto block text-lg"
    >
      Join Game
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  emits: ["registerHandler", "update:password", "update:email", "update:name"],
  props: {
    password: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const password_ = computed({
      get() {
        return props.password;
      },
      set(val) {
        context.emit("update:password", val);
      },
    });
    const email_ = computed({
      get() {
        return props.email;
      },
      set(val) {
        context.emit("update:email", val);
      },
    });
    const name_ = computed({
      get() {
        return props.name;
      },
      set(val) {
        context.emit("update:name", val);
      },
    });

    const registerHandler = () => context.emit("registerHandler");

    return {
      password_,
      email_,
      name_,
      registerHandler,
    };
  },
});
</script>
