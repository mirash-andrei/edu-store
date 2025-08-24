<script setup>
import { computed, ref } from "vue";
import axios from "axios";
import ProductList from "./components/ProductList.vue";
import ProductSearch from "./components/ProductSearch.vue";
import ProductSearchByPrice from "./components/ProductSearchByPrice.vue";
import ProductAdd from "./components/ProductAdd.vue";

const products = ref();

axios
  .get("https://fakestoreapi.com/products")
  .then((response) => {
    products.value = response.data;
  })
  .catch((error) => {
    console.log(error);
  });

const searchQuery = ref();
const priceRange = ref();

const maxPrice = computed(() => {
  if (!products.value) return;
  return Math.max(...products.value.map((product) => product.price));
});

const searchProducts = computed(() => {
  if (!searchQuery.value && !priceRange.value) {
    return products.value;
  }

  let productsList = products.value;

  if (searchQuery.value) {
    productsList = productsList.filter((product) =>
      product.title.includes(searchQuery.value)
    );
  }

  if (priceRange.value) {
    productsList = productsList.filter(
      (product) =>
        Number(product.price) <= priceRange.value.to &&
        Number(product.price) >= priceRange.value.from
    );
  }
  return productsList;
});

const searchProductByPrice = (range) => {
  priceRange.value = range;
};

const searchProductByName = (query) => {
  searchQuery.value = query;
};

const isShowProductAdd = ref(false);

function toogleShowProductAdd() {
  isShowProductAdd.value = !isShowProductAdd.value;
}

function addNewProduct(newProduct){
  console.log(newProduct);
  products.value.push(newProduct); 
}
</script>

<template>
  <main class="main-wrapper">
    <h1>Интернет магазин</h1>
    <ProductSearch @search-product="searchProductByName" />
    <ProductSearchByPrice
      @search-product-by-price="searchProductByPrice"
      :maxPrice="maxPrice"
    />
    <button class="product-add-btn" @click="toogleShowProductAdd">
      Добавить новый товар
    </button>
    <ProductAdd v-if="isShowProductAdd" @close="toogleShowProductAdd" @new-product="addNewProduct"/>
    <ProductList :products="searchProducts" />
  </main>
</template>

<style scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
}
.product-add-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background 0.3s;
}
.bproduct-add-btn:hover {
  background: #0056b3;
}
</style>
