import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([])

    const basketMap = ref({})

    const total = computed(() =>
        cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const isEmpty = computed(() => cartItems.value.length === 0)

    const syncCart = () => {
        cartItems.value = cartItems.value
            .map(p => ({
                ...p,
                quantity: basketMap.value[p.id] || 0
            }))
            .filter(p => p.quantity > 0)
    }

    socket.on('pong', ({ id, count, allClear }) => {
        if (allClear) {
            basketMap.value = {}
        } else {
            if (count > 0) {
                basketMap.value[id] = count
            } else {
                delete basketMap.value[id]
            }
        }
        syncCart()
    })

    const setProducts = (products) => {
        cartItems.value = products
    }

    const addItem = (product) => {
        socket.emit('add-to-basket', { id: product.id, count: 1 })

        if (!cartItems.value.find(i => i.id === product.id))
            cartItems.value.push({ ...product, quantity: 0 })
    }

    const increaseQuantity = (id) => {
        socket.emit('add-to-basket', { id, count: 1 })
    }

    const decreaseQuantity = (id) => {
        socket.emit('add-to-basket', { id, count: -1 })
    }

    const removeItem = (id) => {
        socket.emit('change-count', { id, count: 0 })
    }

    const clearCart = () => {
        socket.emit('clear-basket')
    }

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
    }
})
