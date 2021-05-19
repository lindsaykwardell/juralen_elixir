<template>
  <ul v-if="!loading">
    {{
      data
    }}
    <li v-for="user in data.allUsers" :key="user.id">
      ({{ user.id }}) {{ user.name }} | {{ user.email }}
    </li>
  </ul>
  <div>{{ sub }}</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useQuery, useSubscription, useMutation } from "@/graphql";
import gql from "graphql-tag";

export default defineComponent({
  name: "App",
  setup() {
    const { data: sub } = useSubscription(gql`
      subscription GameQueue {
        gameQueue {
          uuid
          # grid {
          #   x
          #   y
          #   cellType
          #   structure
          #   defBonus
          # }
          players {
            name
            id
          }
        }
      }
    `);
    const { loading, data } = useQuery(gql`
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
});
</script>
