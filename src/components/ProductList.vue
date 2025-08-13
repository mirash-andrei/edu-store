<script setup>
import ProductCard from "./ProductCard.vue";
const props = defineProps(["products"]);
</script>

<template>
  <div class="product-list">
    <ProductCard
      v-for="product in props.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
</style>
