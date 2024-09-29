<script setup>
import usePropiedades from '../../composables/usePropiedades.js'
import { propertyPrice } from '@/helpers/PropertyPrice'
const { propiedadesCollection, deleteItem } = usePropiedades()

// console.log(propiedadesCollection)
</script>
<template>
  <v-card flat class="mx-auto">
    <v-list>
      <v-list-item v-for="propiedad in propiedadesCollection" :key="propiedad.id">
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img width="180" :src="propiedad.imagen" alt="" />
          </v-list-item-media>
        </template>
        <v-list-item-title>
          {{ propiedad.titulo }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ propertyPrice(propiedad.precio) }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            :to="{ name: 'admin-editar', params: { id: propiedad.id } }"
            color="info"
            class="mr-2"
          >
            Editar
          </v-btn>
          <v-btn @click="deleteItem(propiedad.id, propiedad.imagen)" color="warning">
            Eliminar
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
