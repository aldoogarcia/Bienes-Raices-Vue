<script setup>
import PropiedadItem from '@/components/propiedad-item.vue'
import usePropiedades from '../composables/usePropiedades'

const { propiedadesCollection, propertyPrice } = usePropiedades()
</script>

<template>
  <v-card flat class="py-5">
    <h1 class="my-5 text-center">Nuestras Propiedades</h1>
    <v-row>
      <PropiedadItem
        v-for="propiedad in propiedadesCollection"
        :key="propiedad.id"
        :propiedad="propiedad"
        :price="propertyPrice"
      />
    </v-row>
  </v-card>
</template>
