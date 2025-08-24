<template>
  <div class="search price-search">
  <h3>Поиск по цене</h3>
  <div class="inputs-row">
  <label>
    <span>От: </span>
    <input type="text" v-model="from" placeholder="0">
  </label>
  <label>
    <span>До: </span>
    <input type="text" v-model="to" :placeholder="props.maxPrice">
  </label>
  <button @click="searchHandler">Найти</button>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(["maxPrice"]);
const emits = defineEmits(['search-product-by-price']);

const from = ref(0);
const to = ref();

function searchHandler() {
  emit('search-product-by-price', {
    from: from.value ?? 0,
    to: to.value ?? props.maxPrice
  });
}
</script>

<style scoped lang="scss">
.price-search {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;

  .inputs-row {
    display: flex;
    gap: 10px;
    width: 100%;

    label {
      display: flex;
      align-items: center;
      flex: 1;

      span {
        font-size: 14px;
        color: #555;
        margin-bottom: 4px;
      }

      input {
        width: 100%;
        padding: 10px 12px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 6px;
        outline: none;
        transition: border 0.2s;

        &:focus {
          border-color: #4cafef;
        }

        &::placeholder {
          color: #aaa;
        }
      }
    }

    button {
      padding: 0 20px;
      font-size: 14px;
      border: none;
      border-radius: 6px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>