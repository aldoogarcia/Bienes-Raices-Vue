<script setup>
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import { propertyPrice } from '@/helpers/PropertyPrice'
import 'leaflet/dist/leaflet.css'
import useUbicacionMap from '@/composables/useUbicacion'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { watch } from 'vue'

const route = useRoute()
const db = useFirestore()
const docRef = doc(db, 'propiedades', route.params.id)
const propiedad = useDocument(docRef)

const { zoom, center } = useUbicacionMap()

watch(propiedad, (propiedad) => {
  center.value = propiedad.ubicacion
})
// console.log(propiedad)
</script>

<template>
  <v-card flat>
    <v-card-title class="font-weight-bold text-h5 text-center">
      {{ propiedad?.titulo }}
    </v-card-title>
    <v-img height="400" :src="propiedad?.imagen" />

    <div class="d-flex flex-column flex-md-row font-weight-bold text-center">
      <v-card-text>
        <v-icon size="24px" color="blue">mdi-tag</v-icon>
        <p>Precio: {{ propertyPrice(propiedad?.precio) }}</p>
      </v-card-text>
      <v-card-text>
        <v-icon size="24px" color="blue">mdi-toilet</v-icon>
        <p>Baños: {{ propiedad?.wc }}</p>
      </v-card-text>
      <v-card-text>
        <v-icon size="24px" color="blue">mdi-parking</v-icon>
        <p>Estacionamiento: {{ propiedad?.estacionamiento }}</p>
      </v-card-text>
      <v-card-text>
        <v-icon size="24px" color="blue">mdi-bed</v-icon>
        <p>Habitaciones: {{ propiedad?.habitaciones }}</p>
      </v-card-text>
    </div>

    <div>
      <v-row>
        <v-col cols="12" md="8">
          <h3>Descripcion</h3>
          <div class="text-pre-wrap">
            {{ propiedad?.descripcion }}
          </div>
        </v-col>
        <v-col>
          <div style="height: 300px">
            <LMap ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
              <LMarker :lat-lng="center">
                <LPopup>
                  <span>{{ propiedad?.titulo }}</span
                  ><br />
                  <span>Cordenadas: {{ propiedad.ubicacion }}</span>
                </LPopup>
              </LMarker>
              <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              ></LTileLayer>
            </LMap>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<style>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
