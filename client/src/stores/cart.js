import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const CART_KEY = 'cart'

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([])

    const total = computed(() => {
        return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
        })

    const isEmpty = computed(() => cartItems.value.length === 0)

    const loadCart = () => {
        const cart = localStorage.getItem(CART_KEY)
        if (cart) {
            cartItems.value = JSON.parse(cart)
        }
    }

    const saveCart = () => {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems.value))
    }

    const addItem = (product) => {
        const existing = cartItems.value.find((item) => item.id === product.id)
        if (existing) {
            existing.quantity += 1
        } else {
            cartItems.value.push({ ...product, quantity: 1 })
        }
        saveCart()
    }

    const increaseQuantity = (id) => {
        const item = cartItems.value.find((i) => i.id === id)
        if (item) {
            item.quantity += 1
            saveCart()
        }
    }

    const decreaseQuantity = (id) => {
        const item = cartItems.value.find((i) => i.id === id)
        if (!item) return

        if (item.quantity > 1) {
            item.quantity -= 1
        } else {
            removeItem(id)
            return
        }
        saveCart()
    }

    const removeItem = (id) => {
        cartItems.value = cartItems.value.filter((item) => item.id !== id)
        saveCart()
    }

    const clearCart = () => {
        cartItems.value = []
        saveCart()
    }

    return {
        cartItems,
        total,
        isEmpty,
        loadCart,
        saveCart,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
    }
})
