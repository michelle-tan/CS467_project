<!-- 
NOTES: the data at the bottom is there to check the form was setting it properly
Need to add:
      -item check: check if the item is already in the store, should be case insensitive
      -tags: ability to add items with tags
      -images: ability to add items with images
      -allow floats or at least 2dec numbers to be input in price and weight  step="0.01"?

Needs CSS styleing


-->

<template>
  <div class="container">
    <h1>Post form</h1>
    <hr>
    <b-form ref="form" @submit.prevent="handleSubmit">
      <!-- Product Name -->
      <b-form-group label="Product Name">
        <b-form-input type="text" v-model="productData.name" placeholder="Product Name..." required></b-form-input>
      </b-form-group>
      <!-- Product Desc -->
      <b-form-group label="Description">
        <b-form-textarea
          v-model="productData.description"
          placeholder="Write something..."
          required
        ></b-form-textarea>
      </b-form-group>
      <!-- Product quantity -->
      <b-form-group label="Quantity">
        <b-form-input type="number" v-model="productData.quantity" required></b-form-input>
      </b-form-group>
      <!-- Product Price -->
      <b-form-group label="Price">
        <b-form-input type="number" v-model="productData.price" required></b-form-input>
      </b-form-group>
      <!-- Product weight -->
      <b-form-group label="Weight">
        <b-form-input type="number" v-model="productData.weight"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="submitButton">Submit</b-button>
    </b-form>
    <hr>
    <h3>Testing Data - delete later</h3>
    <p>Product Name: {{productData.name}}</p>
    <p>Product description: {{productData.description}}</p>
    <p>Product quantity: {{productData.quantity}}</p>
    <p>Product price: {{productData.price}}</p>
    <p>Product weight: {{productData.weight}}</p>
    <p>Product numbersold: {{productData.numbersold}}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostProductForm",
  data() {
    return {
      productData: {
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        weight: 0,
        numbersold: 0
      }
    };
  },
  props: {
    // maybe
  },
  methods: {
    // Check if the product exists method
    checkProduct(name) {
      // needs work
    },

    // submit method
    handleSubmit(event) {
      axios({
        method: "POST",
        url:
          "http://localhost:3000/shop/sample store name/dashboard/addproducts",
        data: { ...this.productData }
      })
        .then(response => {
          if (response.status === 201) {
            /* // Debugging
            console.log("Added product to store");
            console.log("Resetting form");
            */
            event.target.reset();
            /* // Debugging, dont think we need the emit but left in case otherwise.
            console.log("form reset");
            this.$emit("Added", null);
            */
          }
        })
        .catch(err => {
          console.log(err);
        });
      /******************* 
      // BOTH METHODS WORK. using above for consistency
      const url =
        "http://localhost:3000/shop/sample store name/dashboard/addproducts";
      return axios
        .post(url, {
          ...this.productData
        })
        .then(response => {
          if (response.status === 200) {
            console.log("Added product to store");
            this.$emit("Added", null);
          }
        })
        .catch(err => {
          console.log(err);
        });
        ************************************/
    }
  }
};
</script>

<style>
</style>


