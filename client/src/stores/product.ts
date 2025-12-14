import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { Product, GraphQLProductResponse, GraphQLQueryVariables } from '@/types/graphql';

const GRAPHQL_URL = 'http://localhost:4000/graphql';

export const useProductStore = defineStore('product', () => {
    const product: Ref<Product | null> = ref(null);
    const loading: Ref<boolean> = ref(false);
    const error: Ref<string | null> = ref(null);

    const loadProduct = async (id: string | number): Promise<void> => {
        loading.value = true;
        error.value = null;
        product.value = null;

        try {
            const variables: GraphQLQueryVariables = { id };
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
                    variables
                })
            });

            const json: GraphQLProductResponse = await response.json();
            
            if (json.errors) {
                throw new Error(json.errors[0]?.message || 'GraphQL error');
            }
            
            product.value = json.data.product;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить товар';
            error.value = errorMessage;
        } finally {
            loading.value = false;
        }
    };

    const clearProduct = (): void => {
        product.value = null;
        error.value = null;
    };

    return {
        product,
        loading,
        error,
        loadProduct,
        clearProduct,
    };
});

