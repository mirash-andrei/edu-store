import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import ProductDetail from '../views/ProductDetail.vue';
import AddProduct from '../views/AddProduct.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const isAuthenticated = (): boolean => {
  const auth = localStorage.getItem('auth');
  return auth === 'true';
};

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.meta.requiresAuth) {
    if (isAuthenticated()) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;

