import { createRouter, createWebHistory, RouterLink } from 'vue-router'
import CardapioView from '../views/CardapioView.vue'
import PedidosView from '../views/PedidosView.vue'
import ConfigView from '../views/ConfigView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CardapioView,
      meta: { requiredNiveis: ['normal', 'admin'] },
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: PedidosView,
      meta: { requiredNiveis: ['gerenciador', 'admin'] },
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView,
      meta: { requiredNiveis: ['admin'] },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ]
})

// Adicionando lógica de verificação de login
router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem('isLogged') === 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const userNivel = localStorage.getItem('userNivel');

  // Se o usuário não estiver autenticado ou não tiver o nível adequado, redirecione para a página de login
  if (!isLogged || (to.meta && to.meta.requiredNiveis && !to.meta.requiredNiveis.includes(userNivel))) {
    next({name: 'NotFound'});
  } else {
    next();
  }
});

export default router;