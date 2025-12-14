import { ref, type Ref } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import type { Product } from '@/types/graphql';

export interface UseProductReturn {
  product: Ref<Product | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  loadProduct: (id?: string | number) => Promise<void>;
}

export function useProduct(productId?: string | number): UseProductReturn {
  const product: Ref<Product | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);
  const currentProductId: Ref<string | number | undefined> = ref(productId);

  const loadProduct = async (id?: string | number): Promise<void> => {
    const targetId = id !== undefined ? id : currentProductId.value;

    if (!targetId || (typeof targetId === 'number' && targetId <= 0)) {
      error.value = 'Invalid product ID';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response: AxiosResponse<Product> = await axios.get(`https://fakestoreapi.com/products/${targetId}`);
      product.value = response.data;
      currentProductId.value = targetId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load product';
      error.value = errorMessage;
    } finally {
      loading.value = false;
    }
  };

  return {
    product,
    loading,
    error,
    loadProduct
  };
}

