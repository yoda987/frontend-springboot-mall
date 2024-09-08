<template>
  <h1>Product List</h1>
  <div class="list">
    <div class="card" v-for="product in products" :key="product.productId">
      <img :src="product.imageUrl" class="image" />
      <div class="product">
        <h2 class="name">{{ product.productName }}</h2>
        <p class="category">Category: {{ product.category }}</p>
        <p class="price">Price: ${{ product.price }}</p>
        <p class="stock">Stock: {{ product.stock }}</p>
        <p class="description">Description: {{ product.description }}</p>
        <p class="createdDate">
          Created Date: {{ new Date(product.createdDate).toLocaleDateString() }}
        </p>
        <!-- <p class="product-date">Last Modified Date: {{ new Date(product.lastModifiedDate).toLocaleDateString() }}</p> -->
        <button @click="editProduct(product)" class="edit-button">Edit</button
        ><br />
        <button @click="deleteProduct(product.productId)" class="delete-button">
          Delete
        </button>
      </div>
    </div>

    <!-- Edit Product -->
    <div v-if="Editing" class="editProduct" @click="closeModal">
      <div class="edit" @click.stop>
        <h2>Edit Product</h2>
        <form @submit.prevent="updateProduct">
          <input
            v-model="EditProduct.productName"
            placeholder="Product Name"
            required
          /><br />
          <input
            v-model="EditProduct.category"
            placeholder="Category"
            required
          /><br />
          <input
            v-model="EditProduct.imageUrl"
            placeholder="Image URL"
            required
          /><br />
          <input
            v-model.number="EditProduct.price"
            type="number"
            placeholder="Price"
            required
          /><br />
          <input
            v-model.number="EditProduct.stock"
            type="number"
            placeholder="Stock"
            required
          /><br />
          <textarea
            v-model="EditProduct.description"
            placeholder="Description"
          ></textarea
          ><br />
          <button type="submit">Update Product</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const Editing = ref(false);
const EditProduct = ref({});

const fetchProducts = async () => {
  try {
    const response = await axios.get("/products");
    products.value = response.data;
  } catch (err) {
    error.value = "Failed to load products";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/products/${productId}`);
    alert(response.data);
    fetchProducts();
  } catch (err) {
    error.value = "Failed to delete product";
    console.error(err);
  }
};

const editProduct = (product) => {
  EditProduct.value = product;
  Editing.value = true;
};

const updateProduct = async () => {
  try {
    const response = await axios.put(
      `/products/${EditProduct.value.productId}`,
      EditProduct.value
    );
    alert(response.data);
    fetchProducts();
    cancelEdit();
  } catch (err) {
    error.value = "Failed to update product";
    console.error(err);
  }
};

const cancelEdit = () => {
  Editing.value = false;
};

onMounted(() => {
  fetchProducts();
});
</script>

<style>
.list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 30%;
  padding: 15px;
  box-sizing: border-box;
}

.image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.name {
  font-size: 20px;
  margin-top: 10px;
}

.category,
.price,
.stock,
.description,
.date,
.createdDate {
  font-size: 16px;
  margin: 5px 5;
}

.price {
  font-weight: bold;
}

/* {
  margin-top: 10px;
} */

.edit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 110px;
  cursor: pointer;
  font-size: 15px;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 100px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 5px;
}

.delete-button:hover {
  background-color: #c82333;
}

.editProduct {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
}

.edit h2 {
  margin: 0 0 20px;
}

.edit input,
.edit textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.edit button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 10px;
  margin-right: 10px;
}
</style>
