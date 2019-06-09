<template>
  <b-container class="bv-example-row" id="inventory">
    <div>
      <h3>
        Viewing Inventory for:
        {{storeToGet}}
      </h3>

      <!-- ADD PRODUCT -->
      <b-button @click="showAddProductModal = true" variant="info">Add Product</b-button>
      <b-modal
        title="Add A New Product"
        v-model="showAddProductModal"
        centered
        id="addproductmodal"
        size="xl"
        scrollable
        hide-footer
      >
        <PostProductForm
          :storeToPost="storeToGet"
          :storeOwnerId="sessionData.userinfo.user_id"
          :storeOwnerUser="sessionData.userinfo.username"
        />
      </b-modal>

      <!-- EDIT PRODUCT -->
      <b-modal
        title="Edit An Existing Product"
        v-model="showEditProductModal"
        centered
        id="editproductmodal"
        size="xl"
        scrollable
        hide-footer
      >
        <EditProductForm :productPropId="productIDToEdit"/>
      </b-modal>
      <b-link :to="storeFrontLink">Link to Store Front</b-link>
    </div>

    <!-- Table -->
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
              <img :src="getPathToSrc(obj.image)" alt="obj.name" height="100" width="100">
            </td>
            <td>{{obj.Quantity}}</td>
            <td>${{obj.Price}}</td>
            <td>{{obj.Weight}}</td>
            <td>{{obj.NumberSold}}</td>
            <td>
              <b-button variant="warning" @click="editProduct(obj._id)">Edit</b-button>
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
import PostProductForm from "@/components/PostProductForm.vue";
import EditProductForm from "@/components/EditForm.vue";
export default {
  name: "ManageInventory",
  components: {
    PostProductForm,
    EditProductForm
  },
  data() {
    return {
      storeProducts: [],
      storeRouterLink: "",
      storeFrontLink: "",
      showAddProductModal: false,
      showEditProductModal: false,
      productIDToEdit: ""
    };
  },
  props: {
    sessionData: Object,
    storeToGet: String
  },
  updated() {
    // this function will link to the storefront page
    this.$nextTick(() => {
      let link = `/products/Store/${this.storeToGet}`;
      this.$set(this.$data, "storeFrontLink", link);
    });

    // this function will change the router-link url for the add product form base on the selected store from accountstoreowner.vue
    this.$nextTick(() => {
      let link = `/account/manageStore/addProduct/${this.storeToGet}`;
      this.$set(this.$data, "storeRouterLink", link);
    });

    // this function will get the data from the server and store it in the storeProducts array
    this.$nextTick(() => {
      axios({
        method: "GET",
        url: this.$hostname + `/shop/${this.storeToGet}/products`
      })
        .then(res => {
          // response is a large thing, we want the data.
          //console.log(res);
          if (res.status == 200) {
            let responseCopy = res.data;
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
      /*
      console.log(`Going to edit ${idNumber}`);
      this.$router.push({
        name: "editProduct",
        params: { productId: `${idNumber}` }
      });
      */
      this.$set(this.$data, "productIDToEdit", idNumber);
      this.$set(this.$data, "showEditProductModal", true);
    },
    deleteProduct(idNumber) {
      console.log(`Going to delete ${idNumber}`);
      axios({
        method: "DELETE",
        url: this.$hostname + "/shop/" + `${idNumber}`
      })
      .then(res => {
        if(res.status == 200){
          console.log(res.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getPathToSrc(src){
        
            return this.$hostname + "/images/products/" + src
    }
  }
};
</script>

<style>
#inventory {
  padding: 0px;
  margin-top: 20px;
}
</style>


