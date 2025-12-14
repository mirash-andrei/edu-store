import type { Product } from '@/types/graphql';

interface LocalCartItem {
  id: string | number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const addToCart = (product: Product | null | undefined): void => {
    if (!product) {
        return;
    }

    const cart: LocalCartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: LocalCartItem) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар добавлен в корзину');
};

