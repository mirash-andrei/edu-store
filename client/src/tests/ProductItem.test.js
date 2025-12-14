import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import ProductCard from '../components/ProductItem.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/products/:id', name: 'product', component: { template: '<div />' } }],
})

describe('ProductCard.vue', () => {
    const product = {
        id: 1,
        title: 'Test Product',
        category: 'Electronics',
        price: 199.99,
        image: 'https://example.com/image.jpg',
    }

    it('renders product details correctly', async () => {
        const wrapper = mount(ProductCard, {
            props: { product },
            global: { plugins: [router] },
        })

        expect(wrapper.find('.product-title').text()).toBe(product.title)
        expect(wrapper.find('.product-category').text()).toBe(product.category)
        expect(wrapper.find('.product-price').text()).toContain(product.price)
    })

    it('displays product image with correct src and alt attributes', () => {
        const wrapper = mount(ProductCard, {
            props: { product },
            global: { plugins: [router] },
        })

        const img = wrapper.find('img')
        expect(img.attributes('src')).toBe(product.image)
        expect(img.attributes('alt')).toBe(product.title)
    })

    it('contains a router-link pointing to the correct product page', () => {
        const wrapper = mount(ProductCard, {
            props: { product },
            global: { plugins: [router] },
        })

        const link = wrapper.findComponent({ name: 'RouterLink' })
        expect(link.exists()).toBe(true)
        expect(link.props('to')).toBe(`/products/${product.id}`)
    })

    it('renders the "Подробнее" button', () => {
        const wrapper = mount(ProductCard, {
            props: { product },
            global: { plugins: [router] },
        })

        const button = wrapper.find('.btn-details')
        expect(button.exists()).toBe(true)
        expect(button.text()).toBe('Подробнее')
    })
})
