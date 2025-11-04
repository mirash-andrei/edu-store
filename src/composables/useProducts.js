import { ref } from 'vue'
import axios from 'axios'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get('https://fakestoreapi.com/products')
      products.value = response.data
    } catch (err) {
      error.value = err.message || 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    loadProducts
  }
}
