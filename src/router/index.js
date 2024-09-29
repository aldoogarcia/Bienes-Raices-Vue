import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
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
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/propiedadView/:id',
      name: 'muestra-propiedad',
      component: () => import('../views/PropiedadView.vue')
    },

    //meta requerido
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/nueva',
      name: 'admin-nueva',
      component: () => import('../views/admin/NuevaPropiedadView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/propiedades',
      name: 'admin-propiedades',
      component: () => import('../views/admin/AdminView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editar/:id',
      name: 'admin-editar',
      component: () => import('../views/admin/EditarPropiedadesView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)
  if (requiresAuth) {
    try {
      await authenticateUser()
      next()
    } catch (e) {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

function authenticateUser() {
  const auth = useFirebaseAuth()
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe() // Desuscribirse después de obtener el estado de autenticación
      if (user) {
        resolve(user)
      } else {
        reject(new Error('No user authenticated'))
      }
    })
  })
}

export default router
