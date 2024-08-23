        
<script setup>
import {useForm,useField} from 'vee-validate'
import {validationSchema,imageSchema} from '@/validation/propiedadSchema.js'

const {handleSubmit} = useForm({ // solo acepta una validacion por eso las juntamos
    validationSchema:{
        ...imageSchema,
        ...validationSchema
    }
})
const submit = handleSubmit((values)=>{
    console.log(values)
})

const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const wc = useField('wc')
const estacionamiento = useField('estacionamiento')
const descripcion = useField('descripcion')


const items= [5,4,3,2,1].reverse()
        
</script>
<template>
    <v-container class="container mx-auto">
    <v-card
    flat
    >
        <v-card-title >
            <h2 class="text-center">Agrega una Nueva Propiedad</h2>
        </v-card-title>
        <v-card-subtitle>
            <h2 class="mt-3">Crea una nueva propiedad llenando el siguiente formulario</h2>
        </v-card-subtitle>

        <v-form>
            <v-text-field
                label="Titulo Propiedad"
                v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value"
            />
            
            <v-row>
                <v-col
                cols="12"
                md="6"
                    >
                    <v-file-input
                prepend-icon="mdi-camera"
                accept="image/*"
                label="Sube una imagen de la propiedad"
                required
                multiple
                v-model="imagen.value.value"
                :error-messages="imagen.errorMessage.value"
                />
                    
                </v-col>

                <v-col
                cols="12"
                md="6"
                >
                    <v-text-field
                    label="Ingresa el precio "
                    v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col
                cols="12"
                md="4"
                >
                    <v-select
                    label="Cuartos"
                    :items="items"
                    v-model="habitaciones.value.value"
                :error-messages="habitaciones.errorMessage.value"
                    />
                </v-col>
                <v-col
                cols="12"
                md="4"
                >
                    <v-select
                    label="WC"
                    :items="items"
                    v-model="wc.value.value"
                :error-messages="wc.errorMessage.value"
                    />
                </v-col>
                <v-col
                cols="12"
                md="4"
                >
                    <v-select
                    label="Lugares Estacionamiento"
                    :items="items"
                    v-model="estacionamiento.value.value"
                :error-messages="estacionamiento.errorMessage.value"
                    />
                </v-col>
            </v-row>

            <v-textarea
                label="Descripcion"
                class="mb-3"
                v-model="descripcion.value.value"
                :error-messages="descripcion.errorMessage.value"
            />

            <v-checkbox
                label="Alberca"
            />

            <v-btn
            block
            color="light-blue-darken-4"
            class="py-10 text-2xl"
            @click="submit"
            >
                Crear Propiedad
            </v-btn>
        </v-form>
    </v-card>
</v-container>
</template>


