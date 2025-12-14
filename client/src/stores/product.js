import { defineStore } from 'pinia'
import { ref } from 'vue'

const GRAPHQL_URL = 'http://localhost:4000/graphql'

export const useProductStore = defineStore('product', () => {
    const product = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const loadProduct = async (id) => {
        loading.value = true
        error.value = null
        product.value = null

        try {
            const response = await fetch(GRAPHQL_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        query($id: ID!) {
                          product(id: $id) {
                            id
                            title
                            price
                            description
                            category
                            image
                            rating { rate count }
                          }
                        }
                    `,
                    variables: { id }
                })
            })

            const json = await response.json()
            product.value = json.data.product
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
