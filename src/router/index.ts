import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Lobby from '../views/Lobby.vue'
import Game from '../views/Game.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/g/:uuid',
    name: 'Game',
    component: Game
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
