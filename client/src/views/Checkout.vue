<template>
  <div class="checkout-page">
    <h1>Оформление заказа</h1>

    <div v-if="isEmpty" class="empty-cart">
      <p>Ваша корзина пуста</p>
      <router-link to="/products" class="btn-primary">
        Перейти к каталогу
      </router-link>
    </div>

    <div v-else class="checkout-content">
      <form @submit.prevent="handleSubmit" class="checkout-form">
        <div class="form-section">
          <h2>Данные получателя</h2>

          <div class="form-group">
            <label for="name">Имя</label>
            <input id="name" v-model="formData.name" type="text" required class="form-input" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="formData.email" type="email" required class="form-input" />
          </div>

          <div class="form-group">
            <label for="phone">Телефон</label>
            <input id="phone" v-model="formData.phone" type="tel" required class="form-input" />
          </div>

          <div class="form-group">
            <label for="address">Адрес доставки</label>
            <textarea id="address" v-model="formData.address" required rows="3" class="form-input"></textarea>
          </div>
        </div>

        <div class="form-section">
          <h2>Способ оплаты</h2>

          <div class="form-group">
            <label>
              <input v-model="formData.paymentMethod" type="radio" value="card" required />
              Банковская карта
            </label>
          </div>

          <div class="form-group">
            <label>
              <input v-model="formData.paymentMethod" type="radio" value="cash" required />
              Оплата при получении
            </label>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">Оформить заказ</button>
          <router-link to="/cart" class="btn-cancel">Вернуться в корзину</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import type { OrderFormData, Order } from '@/types/order';

const router = useRouter();
const cartStore = useCartStore();
const { cartItems, total, isEmpty } = storeToRefs(cartStore);
const { clearCart } = cartStore;

const formData: Ref<OrderFormData> = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: 'card'
});

const handleSubmit = (): void => {
  const order: Order = {
    ...formData.value,
    items: cartItems.value,
    total: total.value,
    date: new Date().toISOString()
  };

  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  clearCart();

  alert('Заказ успешно оформлен!');
  router.push('/products');
};
</script>

<style scoped>
.checkout-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.checkout-page h1 {
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

.checkout-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.checkout-form {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 30px;
}

.form-section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-group label:has(input[type="radio"]) {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: normal;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-submit {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-submit:hover {
  background: #218838;
}

.btn-cancel {
  display: inline-block;
  background: #6c757d;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-cancel:hover {
  background: #5a6268;
}

.order-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
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
  .checkout-content {
    grid-template-columns: 1fr;
  }
}
</style>

