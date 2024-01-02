import { createRouter, createWebHistory } from 'vue-router'
import CardapioView from '../views/CardapioView.vue'
import PedidosView from '../views/PedidosView.vue'
import ConfigView from '../views/ConfigView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CardapioView
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: PedidosView
      // component: () => import('../views/CardapioView.vue')
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView
      // component: () => import('../views/CardapioView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})

export default router
