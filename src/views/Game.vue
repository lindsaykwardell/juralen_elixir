<template>
  <Container>
    {{ data }}
    <template v-if="data?.updatedGame">
      <div class="flex p-4">
        <div class="text-3xl flex-grow">{{ data.updatedGame.settings.name }}</div>
        <button
          class="border-2 border-red-500 px-4 py-2 hover:border-red-700 hover:bg-red-700 transition duration-75 rounded-full text-lg"
          @click="leaveGame"
        >
          Leave Game
        </button>
      </div>
      <div class="m-6 py-4 bg-gray-900">
        <div
          v-for="player in data.updatedGame.players"
          :key="player.uuid"
          class="grid grid-cols-10 hover:bg-gray-800 p-2"
        >
          <div class="col-span-3">{{ player.name }}</div>
          <div class="col-span-2">
            Is Human <input type="checkbox" checked disabled />
          </div>
          <div class="col-span-2">
            Analyzer
            <select class="bg-black p-1" disabled>
              <option selected>Default</option>
            </select>
          </div>
          <div class="col-span-2">
            <label>
              Color
            </label>
          </div>
          <div>
            <button>Remove Player</button>
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { useSubscription, useMutation } from "@/graphql";
import { Game } from "@/types";
import gql from "graphql-tag";
import { useRoute, useRouter } from "vue-router";
import Container from "@/components/Container.vue";

export default defineComponent({
  setup() {
    const uuid = useRoute().params.uuid;
    const router = useRouter()

    const { data } = useSubscription<{ updatedGame: Game }>(
      gql`
        subscription GameData($uuid: String) {
          updatedGame(uuid: $uuid) {
            uuid
            settings {
              maxX
              maxY
              name
              started
            }
            players {
              uuid
              id
              name
              resources {
                actions
                gold
              }
            }
            grid {
              x
              y
              cellType
              defBonus
              structure
            }
          }
        }
      `,
      {
        uuid,
      }
    );

    const [joinGame] = useMutation<{ joinGame: Game }>(gql`
      mutation JoinGame($uuid: String!) {
        joinGame(uuid: $uuid) {
          uuid
        }
      }
    `);

    const [leaveGame] = useMutation<{ leaveGame: Game }>(gql`
      mutation LeaveGame($uuid: String!) {
        leaveGame(uuid: $uuid) {
          uuid
        }
      }
    `);

    setTimeout(() => {
      joinGame({ variables: { uuid } });
    }, 2000);

    onBeforeUnmount(() =>
      process.env.NODE_ENV === "production"
        ? leaveGame({ variables: { uuid } })
        : null
    );

    return {
      data,
      leaveGame: () => leaveGame({ variables: { uuid } }).then(() => router.push({
        name: 'Lobby'
      })),
    };
  },
  components: {
    Container,
  },
});
</script>
