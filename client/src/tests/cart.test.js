import { describe, it, expect, beforeEach, vi } from 'vitest'
import { addToCart } from '../utils/cart.js'

describe('addToCart', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.clearAllMocks()
        global.alert = vi.fn()
    })

    it('does nothing if product is undefined', () => {
        addToCart(undefined)

        expect(localStorage.getItem('cart')).toBeNull()
        expect(global.alert).not.toHaveBeenCalled()
    })

    it('adds a new product to an empty cart', () => {
        const product = { id: 1, title: 'Test', price: 10, image: 'img.jpg' }

        addToCart(product)

        const cart = JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(1)
        expect(cart[0]).toEqual({ ...product, quantity: 1 })
        expect(global.alert).toHaveBeenCalledWith('Товар добавлен в корзину')
    })

    it('adds a new product when other items exist in cart', () => {
        const existingCart = [{ id: 1, title: 'Old', price: 5, image: 'x.jpg', quantity: 2 }]
        localStorage.setItem('cart', JSON.stringify(existingCart))

        const newProduct = { id: 2, title: 'New', price: 15, image: 'y.jpg' }
        addToCart(newProduct)

        const cart = JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(2)
        expect(cart.find(i => i.id === 2).quantity).toBe(1)
    })

    it('increments quantity if product already exists in cart', () => {
        const existingCart = [{ id: 1, title: 'Test', price: 10, image: 'img.jpg', quantity: 1 }]
        localStorage.setItem('cart', JSON.stringify(existingCart))

        const product = { id: 1, title: 'Test', price: 10, image: 'img.jpg' }
        addToCart(product)

        const cart = JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(1)
        expect(cart[0].quantity).toBe(2)
    })

    it('stores updated cart in localStorage', () => {
        const product = { id: 1, title: 'Test', price: 10, image: 'img.jpg' }

        addToCart(product)

        const saved = JSON.parse(localStorage.getItem('cart'))
        expect(saved).toEqual([{ ...product, quantity: 1 }])
    })
})
