import { createRouter, createWebHistory } from 'vue-router'; 
import ProductList from '../components/ProductList.vue';
import AddProduct from '../components/AddProduct.vue';


const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
