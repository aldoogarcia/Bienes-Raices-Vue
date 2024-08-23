        
<script setup>

const items= [5,4,3,2,1,0].reverse()
        
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
                label="Titulo Propiedad "
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
                />
                    
                </v-col>

                <v-col
                cols="12"
                md="6"
                >
                    <v-text-field
                    label="Ingresa el precio "
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
                    />
                </v-col>
                <v-col
                cols="12"
                md="4"
                >
                    <v-select
                    label="WC"
                    :items="items"
                    />
                </v-col>
                <v-col
                cols="12"
                md="4"
                >
                    <v-select
                    label="Lugares Estacionamiento"
                    :items="items"
                    />
                </v-col>
            </v-row>

            <v-textarea
                label="Descripcion"
                class="mb-3"
            />

            <v-checkbox
                label="Alberca"
            />

            <v-btn
            block
            color="light-blue-darken-4"
            class="py-10 text-2xl"
            >
                Crear Propiedad
            </v-btn>
        </v-form>
    </v-card>
</v-container>
</template>


