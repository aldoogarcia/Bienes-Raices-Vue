import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'
import { computed } from 'vue'

export default function useImage() {
  const storage = useFirebaseStorage()
  const storageRefPhat = storageRef(storage, `/img/${uid()}.jpg`)

  const { url, upload } = useStorageFile(storageRefPhat)

  const updateImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      upload(file)
    }
    console.log(url, 'tumama')
  }

  const image = computed(() => {
    return url.value ? url.value : null
  })
  return {
    url,
    image,
    updateImage
  }
}
