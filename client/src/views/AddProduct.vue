<template>
  <div class="add-product">
    <h1>Добавление товара</h1>
    <form @submit.prevent="handleSubmit" class="product-form">
      <div class="form-group">
        <label for="title">Название товара</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="price">Цена</label>
        <input
          id="price"
          v-model.number="formData.price"
          type="number"
          step="0.01"
          required
          min="0"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="category">Категория</label>
        <input
          id="category"
          v-model="formData.category"
          type="text"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="description">Описание</label>
        <textarea
          id="description"
          v-model="formData.description"
          required
          rows="5"
          class="form-input"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="image">URL изображения</label>
        <input
          id="image"
          v-model="formData.image"
          type="url"
          required
          class="form-input"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-submit">Добавить товар</button>
        <router-link to="/products" class="btn-cancel">Отмена</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import type { Product, Rating } from '@/types/graphql';

const router = useRouter();
const { loadProducts } = useProducts();

interface FormData {
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface LocalProduct extends Omit<Product, 'id' | 'rating'> {
  id: number;
  rating: Rating;
}

const formData: Ref<FormData> = ref({
  title: '',
  price: 0,
  category: '',
  description: '',
  image: ''
});

const handleSubmit = (): void => {
  const newProduct: LocalProduct = {
    ...formData.value,
    id: Date.now(),
    rating: {
      rate: 0,
      count: 0
    }
  };

  const localProducts: LocalProduct[] = JSON.parse(localStorage.getItem('localProducts') || '[]');
  localProducts.push(newProduct);
  localStorage.setItem('localProducts', JSON.stringify(localProducts));

  alert('Товар успешно добавлен!');
  router.push('/products');
};
</script>

<style scoped>
.add-product {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.add-product h1 {
  margin-bottom: 30px;
  color: #333;
}

.product-form {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
</style>
