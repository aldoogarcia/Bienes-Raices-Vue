<script setup>
import {useField,useForm} from 'vee-validate'
import { loginSchema  } from '@/validation/LoginSchema';
import {useAuthStore} from '../stores/auth.js'

const { handleSubmit } = useForm({validationSchema: loginSchema})

const auth = useAuthStore()
const email = useField('email')
const password = useField('password')

const submit= handleSubmit((values)=>{
    auth.login(values)
})

</script>

<template>
    <v-card 
    flat 
    max-width=800
    class="mx-auto">
        <v-card-title class="text-center text-h4 ">
            Iniciar Secion
        </v-card-title>
        <v-card-subtitle class="text-center text-h5">
            Inicia Secion con correo
        </v-card-subtitle>

        <v-form>
            <v-text-field
                v-model="email.value.value"
                label="Correo Electronico"
                type="text"
                :error-messages="email.errorMessage.value"
                class="mb-3"
                
            />
            <v-text-field
                v-model="password.value.value"
                label="Contraseña"
                type="password"
                :error-messages="password.errorMessage.value"
                class="mb-3"
                
            />
            <v-btn 
            color="light-blue-accent-3"
            block
            @click="submit"
            
            class="rounded-lg ">
                Iniciar Sesión
            </v-btn>
        </v-form>
    </v-card>
</template>