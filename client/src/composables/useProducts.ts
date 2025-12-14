import { ref, type Ref } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import type { Product } from '@/types/graphql';

export interface UseProductsReturn {
  products: Ref<Product[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  loadProducts: () => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const products: Ref<Product[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const loadProducts = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response: AxiosResponse<Product[]> = await axios.get('https://fakestoreapi.com/products');
      products.value = response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      error.value = errorMessage;
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    error,
    loadProducts
  };
}

