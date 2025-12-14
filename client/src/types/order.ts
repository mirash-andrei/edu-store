import type { CartItem } from './cart';

export type PaymentMethod = 'card' | 'cash';

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: PaymentMethod;
}

export interface Order extends OrderFormData {
  items: CartItem[];
  total: number;
  date: string;
}

