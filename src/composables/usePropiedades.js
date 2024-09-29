import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storegeRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export default function usePropiedades() {
  const storage = useFirebaseStorage()
  const db = useFirestore()
  const propiedadesCollection = useCollection(collection(db, 'propiedades'))

  async function deleteItem(id, imageUrl) {
    console.log(imageUrl)
    if (confirm('Deseas eliminar esta propiedad')) {
      const docRef = doc(db, 'propiedades', id)
      const storageRefe = storegeRef(storage, imageUrl)
      await Promise.all([deleteDoc(docRef), deleteObject(storageRefe)])
    }
  }

  return {
    propiedadesCollection,
    deleteItem
  }
}
