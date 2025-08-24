<script setup>
import { ref, defineProps, defineEmits } from "vue";

const emit = defineEmits(["close", "new-product"]);

const product = ref({
  id: Math.random(),
  title: "",
  description: "",
  category: "",
  price: "",
  image: "",
  rating: { rate: 0, count: 0 },
});

function addProduct() {
  emit("new-product", product.value);
  alert("Товар успешно добавлен!");
  emit("close");
}

function closeModal() {
  emit("close");
}
</script>

<template>
  <transition name="fade">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="product-form-wrapper">
        <button class="close-btn" @click="closeModal">✕</button>
        <h3>Добавить новый товар</h3>
        <div class="form-group">
          <label>Название</label>
          <input type="text" v-model="product.title" />
        </div>
        <div class="form-group">
          <label>Описание</label>
          <textarea v-model="product.description"></textarea>
        </div>
        <div class="form-group">
          <label>Категория</label>
          <input type="text" v-model="product.category" />
        </div>
        <div class="form-group">
          <label>Цена</label>
          <input type="text" v-model="product.price" />
        </div>
        <div class="form-group">
          <label>ссылка на изображение</label>
          <input type="text" v-model="product.image" />
        </div>
        <button class="submit-btn" @click="addProduct">Добавить</button>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.product-form-wrapper {
  position: relative;
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 16px;

  .close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
    transition: color 0.2s;

    &:hover {
      color: #000;
    }
  }

  h3 {
    padding-right: 10px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 14px;
      color: #555;
    }

    input[type="text"],
    select {
      padding: 10px 12px;
      font-size: 14px;
      border: 1px solid #ddd;
      border-radius: 6px;
      outline: none;
      transition: border 0.2s;

      &:focus {
        border-color: #4cafef;
      }
    }

    &.checkbox-group {
      flex-direction: row;
      align-items: center;
      gap: 8px;

      input[type="checkbox"] {
        width: 16px;
        height: 16px;
      }
    }
  }

  .submit-btn {
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
