import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useAuthStore = defineStore('auth',()=>{
    const userath= ref({})
    const errorMsg= ref('')
    const auth= useFirebaseAuth();
    const errorCodes= {
        'auth/invalid-credential': 'El usuario o contraseña son incorrectos'
    }

    function login ({email,password}){
        signInWithEmailAndPassword(auth,email,password)
        .then((useCredenciales)=>{
            const {user}=useCredenciales
            userath.value=user

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

    return{
        login,
        errorMsg,
        hasError
    }
})