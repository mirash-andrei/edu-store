<script setup>
import { ref } from 'vue';

const emits = defineEmits();

const searchQuery = ref();

function searchHandler(){
    emits('search-product', searchQuery.value)
}
</script>

<template>
<div class="search">
  <h3>Поиск по названию</h3>
  <div class="inputs-row">
    <label>
      <input type="text" v-model="searchQuery" placeholder="Название">
    </label>
    <button @click="searchHandler">Найти</button>
  </div>
  </div>
</template>

<style scoped lang="scss">
.search {
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
      flex: 1;
      display: flex;
      flex-direction: column;

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
      padding: 10px 20px;
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