<script setup>
import { propertyPrice } from '@/helpers/PropertyPrice'

defineProps({
  propiedad: {
    type: Object,
    requires: true
  },
  price: {
    type: Function
  }
})
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="propiedad.imagen" height="260" cover />
      <v-card-title class="text-h6 font-weight-bold text-center">
        {{ propiedad.titulo }}
      </v-card-title>
      <v-card-text class="text-truncate">
        {{ propiedad.descripcion }}
      </v-card-text>

      <v-card-text class="text-h5 font-weight-bold">
        {{ propertyPrice(propiedad.precio) }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          block
          :to="{ name: 'muestra-propiedad', params: { id: propiedad.id } }"
          variant="elevated"
          color="info"
          >Ver mas ..</v-btn
        >
      </template>
    </v-card>
  </v-col>
</template>

<style lang="scss" scoped></style>
