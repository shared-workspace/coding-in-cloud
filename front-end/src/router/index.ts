import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/data-upload',
      name: 'data-upload',
      component: () => import('../views/DataUploadView.vue'),
    }
  ],
})

export default router
