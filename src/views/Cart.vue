<template>
  <div class="cart-page">
    <h1>Корзина</h1>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Ваша корзина пуста</p>
      <router-link to="/products" class="btn-primary">
        Перейти к каталогу
      </router-link>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="cart-item"
        >
          <img :src="item.image" :alt="item.title" class="item-image" />
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p class="item-price">${{ item.price }}</p>
          </div>
          <div class="item-quantity">
            <button @click="decreaseQuantity(item.id)" class="qty-btn">-</button>
            <span class="qty-value">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)" class="qty-btn">+</button>
          </div>
          <div class="item-total">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <button @click="removeItem(item.id)" class="btn-remove">Удалить</button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="total">
          <strong>Итого: ${{ total.toFixed(2) }}</strong>
        </div>
        <router-link to="/checkout" class="btn-checkout">
          Оформить заказ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cartItems = ref([])

const loadCart = () => {
  const cart = localStorage.getItem('cart')
  if (cart) {
    cartItems.value = JSON.parse(cart)
  }
}

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

const increaseQuantity = (id) => {
  const item = cartItems.value.find(item => item.id === id)
  if (item) {
    item.quantity += 1
    saveCart()
  }
}

const decreaseQuantity = (id) => {
  const item = cartItems.value.find(item => item.id === id)
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      removeItem(id)
      return
    }
    saveCart()
  }
}

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
  saveCart()
}

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
})

onMounted(() => {
  loadCart()
})
</script>


<style scoped>
.cart-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-page h1 {
  margin-bottom: 30px;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  background: #f9f9f9;
  border-radius: 8px;
}

.item-info h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #333;
}

.item-price {
  color: #28a745;
  font-weight: bold;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
}

.qty-btn:hover {
  background: #f0f0f0;
}

.qty-value {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}

.btn-remove {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-remove:hover {
  background: #c82333;
}

.cart-summary {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total {
  font-size: 1.5rem;
  color: #333;
}

.btn-checkout {
  background: #28a745;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-checkout:hover {
  background: #218838;
}

.btn-primary {
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #0056b3;
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 15px;
  }
  
  .item-quantity,
  .item-total,
  .btn-remove {
    grid-column: 2;
  }
}
</style>

