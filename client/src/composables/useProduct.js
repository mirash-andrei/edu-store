import { ref } from 'vue'
import axios from 'axios'

export function useProduct(productId) {
  const product = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const currentProductId = ref(productId)

  const loadProduct = async (id) => {
    const targetId = id !== undefined ? id : currentProductId.value

    if (targetId <= 0) {
      error.value = 'Invalid product ID'
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${targetId}`)
      product.value = response.data
      currentProductId.value = targetId
    } catch (err) {
      error.value = err.message || 'Failed to load product'
    } finally {
      loading.value = false
    }
  }

  return {
    product,
    loading,
    error,
    loadProduct
  }
}
