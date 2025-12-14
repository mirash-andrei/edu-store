import { defineStore } from 'pinia';
import { ref, computed, type Ref, type ComputedRef } from 'vue';
import type { Product, GraphQLProductsResponse } from '@/types/graphql';

const GRAPHQL_URL = 'http://localhost:4000/graphql';

export const useProductsStore = defineStore('products', () => {
    const products: Ref<Product[]> = ref([]);
    const loading: Ref<boolean> = ref(false);
    const error: Ref<string | null> = ref(null);
    const hasProducts: ComputedRef<boolean> = computed(() => products.value.length > 0);

    const loadProducts = async (): Promise<void> => {
        loading.value = true;
        error.value = null;

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
            });

            const json: GraphQLProductsResponse = await response.json();
            
            if (json.errors) {
                throw new Error(json.errors[0]?.message || 'GraphQL error');
            }
            
            products.value = json.data.products;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить товары';
            error.value = errorMessage;
        } finally {
            loading.value = false;
        }
    };

    return {
        products,
        loading,
        error,
        hasProducts,
        loadProducts
    };
});

