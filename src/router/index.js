import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('../views/LoginView.vue')
    }
    {
      path: '/admin',
      name: 'admin',
      component: ()=> import('../views/admin/AdminLayout.vue'),
      children: [
        {
        path: '/admin/propiedades',
        name: 'admin-propiedades',
        component: ()=> import('../views/admin/AdminView.vue'),
        },
        {
        path: '/admin/nueva',
        name: 'admin-nueva',
        component: ()=> import('../views/admin/NuuevaPropiedadView.vue'),
        },
        {
        path: '/admin/editar/:id',
        name: 'admin-editar',
        component: ()=> import('../views/admin/EditarPropiedadView.vue'),
        },
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
