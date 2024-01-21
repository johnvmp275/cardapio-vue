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
      path: '/login',
      name: 'login',
      component: LoginView
      // component: () => import('../views/CardapioView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})

// Adicionando lógica de verificação de login
router.beforeEach((to, from, next) => {

  // Verifica o estado de login a partir do localStorage
  const isLogged = localStorage.getItem('isLogged') === 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Se o usuário não estiver autenticado é redirecionado para a página de login
  if (!isLogged && to.name !== 'login') {
    next('/login');
  } else if (isLogged && to.name === 'login') {
    next('/'); 
  } else {
    next();
  }
});


export default router
