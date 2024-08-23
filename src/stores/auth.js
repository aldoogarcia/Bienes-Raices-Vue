import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const userAuth = ref(null)
    const errorMsg = ref('')
    const auth = useFirebaseAuth()
    const errorCodes = {
        'auth/invalid-credential': 'El usuario o contraseña son incorrectos'
    }

    // Mantén sincronizado el estado de autenticación con Firebase
    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userAuth.value = user
                console.log('Usuario logueado', userAuth)
            } else {
                userAuth.value = null
                console.log('No hay usuario logueado')
            }
        })
    })

    // Función de cierre de sesión
    function logOut() {
        signOut(auth)
            .then(() => {
                userAuth.value = null
                router.push({ name: 'login' })
            })
            .catch(err => console.log('Error al cerrar sesión', err))
    }

    // Función de inicio de sesión
    function login({ email, password }) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const { user } = userCredentials
                userAuth.value = user
                router.push({ name: 'admin' })
            })
            .catch((e) => {
                errorMsg.value = errorCodes[e.code] || 'Error desconocido al iniciar sesión'

                setTimeout(() => {
                    errorMsg.value = ''
                }, 7000)
            })
    }

    // Computed para verificar si hay un error
    const hasError = computed(() => {
        return errorMsg.value !== ''
    })

    // Computed para verificar si el usuario está autenticado
    const isAuth = computed(() => {
        return userAuth.value !== null
    })

    return {
        login,
        logOut,
        errorMsg,
        hasError,
        isAuth,
    }
})
