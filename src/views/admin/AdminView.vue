<script setup>
import usePropiedades from '../../composables/usePropiedades.js'

const { propiedadesCollection, propertyPrice } = usePropiedades()
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
          <v-btn color="info" class="mr-2"> Editar </v-btn>
          <v-btn color="warning"> Eliminar </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
