<script setup></script>
<template>
  <div>
    <v-card flat>
      <v-card-title class="text-center">
        <h2>Admin Panel</h2>
      </v-card-title>
      <div class="d-flex flex-column flex-md-row justify-center">
        <div>
          <v-btn :to="{ name: 'admin-nueva' }" color="light-blue-darken-4" class="mb-3">
            <v-icon size="24px" class="mx-3" color="white">mdi-home</v-icon>
            Agregar Nueva Propiedad
          </v-btn>
        </div>
        <div>
          <v-btn :to="{ name: 'admin-propiedades' }" color="light-blue-darken-4" class="mb-3 mx-3">
            <v-icon size="24px" class="mx-3" color="white">mdi-pencil</v-icon>
            Editar Propiedad
          </v-btn>
        </div>
        <div>
          <v-btn :to="{ name: 'home' }" color="light-blue-darken-4" class="mb-3">
            <v-icon size="24px" class="mx-3" color="white">mdi-eye</v-icon>
            Ver las propiedades
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
