import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const GRAPHQL_URL = 'http://localhost:4000/graphql'

export const useProductsStore = defineStore('products', () => {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)
    const hasProducts = computed(() => products.value.length > 0)

    const loadProducts = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(GRAPHQL_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        query {
                          products {
                            id
                            title
                            price
                            description
                            category
                            image
                            rating { rate count }
                          }
                        }
                    `
                })
            })

            const json = await response.json()
            products.value = json.data.products
        } catch (err) {
            error.value = err.message || 'Не удалось загрузить товары'
        } finally {
            loading.value = false
        }
    }

    return {
        products,
        loading,
        error,
        hasProducts,
        loadProducts
    }
})
