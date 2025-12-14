describe('Cart — total price calculation when changing product quantity', () => {
    const testCart = [
        { id: 1, title: 'Product 1', price: 10, quantity: 1, image: 'img1.png' },
        { id: 2, title: 'Product 2', price: 5, quantity: 2, image: 'img2.png' },
    ]

    beforeEach(() => {
        localStorage.setItem('cart', JSON.stringify(testCart))
        cy.visit('/cart')
    })

    it('Displays products from localStorage', () => {
        cy.get('.cart-item').should('have.length', 2)
        cy.contains('Product 1').should('exist')
        cy.contains('Product 2').should('exist')
    })

    it('Calculates total price correctly', () => {
        cy.get('.total strong').should('contain', '$20.00')
    })

    it('Updates total price when increasing quantity', () => {
        cy.contains('.cart-item', 'Product 1').find('.qty-btn').contains('+').click()
        cy.contains('.cart-item', 'Product 1')
            .find('.qty-value')
            .should('contain', '2')

        cy.get('.total strong').should('contain', '$30.00')
    })

    it('Updates total price when decreasing quantity', () => {
        cy.contains('.cart-item', 'Product 2').find('.qty-btn').contains('-').click()
        cy.get('.total strong').should('contain', '$15.00')
    })

    it('Removes product when quantity is 1 and "-" is clicked', () => {
        cy.contains('.cart-item', 'Product 1').find('.qty-btn').contains('-').click()
        cy.get('.cart-item').should('have.length', 1)
        cy.contains('Product 1').should('not.exist')
        cy.get('.total strong').should('contain', '$10.00')
    })
})
