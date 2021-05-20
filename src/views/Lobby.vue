<template>
  <ul v-if="!loading && data">
    {{
      data
    }}
    <li v-for="user in data.allUsers" :key="user.id">
      ({{ user.id }}) {{ user.name }} | {{ user.email }}
    </li>
  </ul>
  <GameQueue v-if="sub" :gameQueue="sub.gameQueue" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useQuery, useSubscription, useMutation } from "@/graphql";
import GameQueue from "../components/lobby/GameQueue.vue";
import gql from "graphql-tag";
import { Game } from "@/types";

export default defineComponent({
  name: "App",
  setup() {
    const { data: sub } = useSubscription<{ gameQueue: Game[] }>(gql`
      subscription GameQueue {
        gameQueue {
          uuid
          players {
            id
            name
          }
          settings {
            maxX
            maxY
            name
          }
        }
      }
    `);
    const { loading, data } = useQuery<{
      allUsers: { name: string; id: string; email: string }[];
    }>(gql`
      query AllUsers {
        allUsers {
          name
          id
          email
        }
      }
    `);

    onMounted(() =>
      setTimeout(() => {
        useMutation(gql`
          mutation JoinLobby {
            joinLobby
          }
        `);
      }, 2000)
    );

    return {
      loading,
      data,
      sub,
    };
  },
  components: {
    GameQueue,
  },
});
</script>
