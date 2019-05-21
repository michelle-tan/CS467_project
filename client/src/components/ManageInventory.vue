<template>
  <b-container class="bv-example-row">
    <h3>Manage Inventory Component</h3>
    <p>
      Note: The post form is a component that will be contained within the account section.
      <br>For now testing purposes both stores have been hardcoded and displayed
    </p>
    <p>Store to get from: {{storeToGet}}</p>
    <hr>
    <div>
      <b-button variant="primary">Add A new Product</b-button>(Not working)
      <br>
      <router-link to="/postFormTest">Link to the test post form</router-link>(Working)
    </div>

    <b-row>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Number Sold</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(obj,index) in storeProducts" v-bind:key="index">
            <td>{{obj._id}}</td>
            <td>{{obj.name}}</td>
            <td>
              <img :src="obj.image" alt="obj.name" height="100" width="100">
            </td>
            <td>{{obj.Quantity}}</td>
            <td>{{obj.Price}}</td>
            <td>{{obj.Weight}}</td>
            <td>{{obj.NumberSold}}</td>
            <td>
              <b-button variant="secondary" @click="editProduct(obj._id)">Edit</b-button>
            </td>
            <td>
              <b-button variant="danger" @click="deleteProduct(obj._id)">X</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ManageInventory",
  components: {
    // might have the forms as children?
  },
  data() {
    return {
      storeProducts: []
    };
  },
  props: {
    sessionData: Object,
    storeToGet: String
    },
  updated() {
    // this function will get the data from the server and store it in the storeProducts array
    // maybe data param would be the store name?
    this.$nextTick(() => {
      axios({
        method: "GET",
        url: this.$hostname + `/shop/${this.storeToGet}/dashboard/products`
      })
        .then(res => {
          // response is a large thing, we want the data.
          console.log(res);
          
          if (res.status == 200) {
            let responseCopy = res.data;
            responseCopy.forEach(element => {
              delete element.comments;
              delete element.__v;
            });
            this.$set(this.$data, "storeProducts", responseCopy);
          } else {
            this.$set(this.$data, "errorDisplay", true);
            console.log(`Error: ${res.status} received`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  methods: {
    editProduct(idNumber) {
      alert(`WIP: Edit ${idNumber}`);
      console.log(`Going to edit ${idNumber}`);
    },
    deleteProduct(idNumber) {
      alert(`WIP: Delete ${idNumber}`);
      console.log(`Going to delete ${idNumber}`);
    }
  }
};
</script>

<style>
</style>


