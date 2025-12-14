import type { Product } from './graphql';

export interface CartItem extends Product {
  quantity: number;
}

export interface BasketMap {
  [key: string | number]: number;
}

