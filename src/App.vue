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
import { defineComponent } from "vue";
import { useQuery, useSubscription } from "@/graphql";
import gql from "graphql-tag";

export default defineComponent({
  name: "App",
  setup() {
    const { data: sub } = useSubscription(gql`
      subscription NewGameCreated {
        newGameCreated(uuid: "1b76f699-3716-4f93-b897-e3b336fdeee8") {
          uuid
          grid {
            x
            y
            cellType
            structure
            defBonus
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

    return {
      loading,
      data,
      sub,
    };
  }
});
</script>
