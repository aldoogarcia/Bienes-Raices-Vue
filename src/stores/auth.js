import {ref, computed,onMounted} from 'vue'
import {defineStore} from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword,onAuthStateChanged, signOut } from 'firebase/auth';
import {useRouter} from 'vue-router'


export const useAuthStore = defineStore('auth',()=>{
    const router= useRouter()
    const userath= ref(null)
    const errorMsg= ref('')
    const auth= useFirebaseAuth();
    const errorCodes= {
        'auth/invalid-credential': 'El usuario o contraseña son incorrectos'
    }

    onMounted(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                userath.value=user
                console.log('Usuario logueado',userath)
            }
        })
    })

    function logOut(){
        signOut(auth)
        .then(
            userath.value=null,
            router.push({name: 'login'})
        )
        .catch(
            err => console.log('Usuario logueado',err)
        )
    }

    function login ({email,password}){
        signInWithEmailAndPassword(auth,email,password)
        .then((useCredenciales)=>{
            const {user}=useCredenciales
            userath.value=user
            router.push({name:'admin'})

        })
        .catch((e)=>{
            errorMsg.value=errorCodes[e.code]

            setTimeout(()=>{
                errorMsg.value=''
            },7000)
        })
    }

    const hasError= computed(()=>{
        return errorMsg.value
    })

    const isAuth= computed(()=>{
        return userath.value
    })

    return{
        login,
        logOut,
        errorMsg,
        hasError,
        isAuth,
    }
})