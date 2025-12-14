import { defineStore } from 'pinia';
import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { io, type Socket } from 'socket.io-client';
import type { Product } from '@/types/graphql';
import type { CartItem, BasketMap } from '@/types/cart';
import type { PongMessage, AddToBasketPayload, ChangeCountPayload } from '@/types/websocket';

const socket: Socket = io('http://localhost:3000');

export const useCartStore = defineStore('cart', () => {
    const cartItems: Ref<CartItem[]> = ref([]);
    const basketMap: Ref<BasketMap> = ref({});

    const total: ComputedRef<number> = computed(() =>
        cartItems.value.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
    );

    const isEmpty: ComputedRef<boolean> = computed(() => cartItems.value.length === 0);

    const syncCart = (): void => {
        cartItems.value = cartItems.value
            .map((p: CartItem) => ({
                ...p,
                quantity: basketMap.value[p.id] || 0
            }))
            .filter((p: CartItem) => p.quantity > 0);
    };

    socket.on('pong', (message: PongMessage) => {
        const { id, count, allClear } = message;
        if (allClear) {
            basketMap.value = {};
        } else {
            if (count > 0) {
                basketMap.value[id] = count;
            } else {
                delete basketMap.value[id];
            }
        }
        syncCart();
    });

    const setProducts = (products: CartItem[]): void => {
        cartItems.value = products;
    };

    const addItem = (product: Product): void => {
        const payload: AddToBasketPayload = { id: product.id, count: 1 };
        socket.emit('add-to-basket', payload);

        if (!cartItems.value.find((i: CartItem) => i.id === product.id)) {
            cartItems.value.push({ ...product, quantity: 0 });
        }
    };

    const increaseQuantity = (id: string | number): void => {
        const payload: AddToBasketPayload = { id, count: 1 };
        socket.emit('add-to-basket', payload);
    };

    const decreaseQuantity = (id: string | number): void => {
        const payload: AddToBasketPayload = { id, count: -1 };
        socket.emit('add-to-basket', payload);
    };

    const removeItem = (id: string | number): void => {
        const payload: ChangeCountPayload = { id, count: 0 };
        socket.emit('change-count', payload);
    };

    const clearCart = (): void => {
        socket.emit('clear-basket');
    };

    return {
        cartItems,
        total,
        isEmpty,
        setProducts,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
    };
});

