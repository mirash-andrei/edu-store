import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProducts } from '../composables/useProducts'
import axios from 'axios'


vi.mock('axios')

describe('useProducts', () => {
    let mockData

    beforeEach(() => {
        mockData = [
            { id: 1, title: 'Product 1', price: 10 },
            { id: 2, title: 'Product 2', price: 20 },
        ]
        vi.clearAllMocks()
    })

    it('loads products successfully', async () => {
        axios.get.mockResolvedValue({ data: mockData })

        const { products, loading, error, loadProducts } = useProducts()

        expect(loading.value).toBe(false)
        expect(products.value).toEqual([])
        expect(error.value).toBeNull()

        const promise = loadProducts()

        expect(loading.value).toBe(true)
        expect(error.value).toBeNull()

        await promise

        expect(loading.value).toBe(false)
        expect(products.value).toEqual(mockData)
        expect(error.value).toBeNull()
    })

    it('sets error when axios request fails', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'))

        const { products, loading, error, loadProducts } = useProducts()

        const promise = loadProducts()
        expect(loading.value).toBe(true)
        expect(error.value).toBeNull()

        await promise

        expect(loading.value).toBe(false)
        expect(products.value).toEqual([])
        expect(error.value).toBe('Network Error')
    })

    it('resets error before loading', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'))

        const { error, loadProducts } = useProducts()
        error.value = 'Previous error'

        await loadProducts()

        expect(error.value).toBe('Network Error')
    })
})
