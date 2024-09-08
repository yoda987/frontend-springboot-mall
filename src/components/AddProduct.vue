<template>
  <div class="addProduct">
    <h1>Add Product</h1>
    <form @submit.prevent="addProduct">
      <div class="form">
        <label for="productName">Product Name</label>
        <input
          v-model="productName"
          id="productName"
          placeholder="Product Name"
        />
        <label for="category">Category</label>
        <input v-model="category" id="category" placeholder="Category" />

        <label for="imageUrl">Image URL</label>
        <input v-model="imageUrl" id="imageUrl" placeholder="Image URL" />

        <label for="price">Price</label>
        <input
          v-model.number="price"
          id="price"
          type="number"
          placeholder="Price"
        />

        <label for="stock">Stock</label>
        <input v-model="stock" id="stock" type="number" placeholder="Stock" />
      </div>
      <div class="form">
        <label for="description">Description</label>
        <textarea
          v-model="description"
          id="description"
          placeholder="Description"
        ></textarea>
      </div>
      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script>
import backEnd from "../backend";

export default {
  name: "AddProduct",
  data() {
    return {
      productName: "",
      category: "",
      imageUrl: "",
      price: null,
      stock: null,
      description: "",
    };
  },
  methods: {
    async addProduct() {
      try {
        const response = await backEnd.post("/products", {
          productName: this.productName,
          category: this.category,
          imageUrl: this.imageUrl,
          price: this.price,
          stock: this.stock,
          description: this.description,
        });
        alert("Product added successfully!");
        console.log("Response:", response.data);
        this.resetForm();
      } catch (error) {
        console.error("There was an error!", error);
        alert("Failed to add product. Please try again.");
      }
    },
    resetForm() {
      this.productName = "";
      this.category = "";
      this.imageUrl = "";
      this.price = null;
      this.stock = null;
      this.description = "";
    },
  },
};
</script>

<style scoped>
.addProduct {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form {
  margin-bottom: 15px;
}

.form label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}

.form input,
.form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
