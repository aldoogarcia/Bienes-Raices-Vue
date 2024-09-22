import { collection } from 'firebase/firestore'
import { computed } from 'vue'
import { useFirestore, useCollection } from 'vuefire'

export default function usePropiedades() {
  const db = useFirestore()
  const propiedadesCollection = useCollection(collection(db, 'propiedades'))

  const propertyPrice = computed(() => {
    return (price) => Number(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  })
  return {
    propiedadesCollection,
    propertyPrice
  }
}
