import {defineStore} from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useAuthStore = defineStore('auth',()=>{
    const auth= useFirebaseAuth();

    function login ({email,password}){
        signInWithEmailAndPassword(auth,email,password)
        .then((useCredenciales)=>{
            console.log(useCredenciales)
        })
        .catch((e)=>{
            console.log(e.code)
            console.log(e.message)
            console.log(email)
            console.log(password)

        })
    }

    return{
        login
    }
})