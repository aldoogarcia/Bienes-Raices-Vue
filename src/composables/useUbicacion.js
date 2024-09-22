import { ref } from 'vue'

export default function useUbicacionMap() {
  const zoom = ref(17)
  const center = ref([19.4796744, -99.0414003, 16.15])

  const pin = (e) => {
    const marker = e.target._latlng
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    pin
  }
}
