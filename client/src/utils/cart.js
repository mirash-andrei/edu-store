export const addToCart = (product) => {
    if (!product) {
        return
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Товар добавлен в корзину')
}
