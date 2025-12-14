import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
    const product = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const loadProduct = async (id) => {
        loading.value = true
        error.value = null
        product.value = null

        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
            product.value = response.data
        } catch (err) {
            error.value = err.message || 'Не удалось загрузить товар'
        } finally {
            loading.value = false
        }
    }

    const clearProduct = () => {
        product.value = null
        error.value = null
    }

    return {
        product,
        loading,
        error,
        loadProduct,
        clearProduct,
    }
})
