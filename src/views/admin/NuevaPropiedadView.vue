<script setup>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { collection, addDoc } from 'firebase/firestore'
import { useForm, useField } from 'vee-validate'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import { validationSchema, imageSchema } from '@/validation/propiedadSchema.js'
import useImage from '@/composables/useImage'
import useUbicacionMap from '../../composables/useUbicacion'

const { updateImage, url, image } = useImage()
const { zoom, center, pin } = useUbicacionMap()
const { handleSubmit } = useForm({
  // solo acepta una validacion por eso las juntamos
  validationSchema: {
    ...imageSchema,
    ...validationSchema
  }
})

const items = [5, 4, 3, 2, 1].reverse()
const db = useFirestore()
const router = useRouter()

const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const wc = useField('wc')
const estacionamiento = useField('estacionamiento')
const descripcion = useField('descripcion')
const alberca = useField('alberca', null, {
  initialValue: false
})

const submit = handleSubmit(async (values) => {
  const { imagen, ...propiedad } = values
  // console.log(propiedad)

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'propiedades'), {
    ...propiedad,
    imagen: url.value,
    ubicacion: center.value
  })
  // console.log("Document written with ID: ", docRef.id);
  if (docRef.id) {
    router.push({ name: 'admin-propiedades' })
  }
})
</script>
<template>
  <v-container class="container mx-auto">
    <v-card flat>
      <v-card-title>
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
          <v-col cols="12" md="6">
            <v-file-input
              prepend-icon="mdi-camera"
              accept="image/*"
              label="Sube una imagen de la propiedad"
              required
              multiple
              v-model="imagen.value.value"
              :error-messages="imagen.errorMessage.value"
              @change="updateImage"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              label="Ingresa el precio "
              v-model="precio.value.value"
              :error-messages="precio.errorMessage.value"
            />
          </v-col>
        </v-row>
        <div v-if="image">
          <p>imagen subida</p>
          <img class="w-50 h-50" :src="image" alt="" />
        </div>

        <v-row>
          <v-col cols="12" md="4">
            <v-select
              label="Cuartos"
              :items="items"
              v-model="habitaciones.value.value"
              :error-messages="habitaciones.errorMessage.value"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              label="WC"
              :items="items"
              v-model="wc.value.value"
              :error-messages="wc.errorMessage.value"
            />
          </v-col>
          <v-col cols="12" md="4">
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
          v-model="alberca.value.value"
          :error-messages="alberca.errorMessage.value"
        />

        <div style="height: 600px">
          <LMap ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker draggable :lat-lng="center" @moveend="pin" />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></LTileLayer>
          </LMap>
        </div>

        <v-btn block color="light-blue-darken-4" class="py-10 text-2xl" @click="submit">
          Crear Propiedad
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
