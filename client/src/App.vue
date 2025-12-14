<template>
  <div id="app">
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navigation from './components/Navigation.vue';
</script>


<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: #f5f5f5;
}
</style>
