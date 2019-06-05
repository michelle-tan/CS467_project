<!-- 

-->

<template>
  <div class="container">
    <!-- DELETE LATER
    <div>Store: {{this.productData.store || "storename"}}</div>
    <div>ID: {{this.productData.owner.id || "id"}}</div>
    <div>user: {{this.productData.owner.username || "user"}}</div>
    -->
    <b-form ref="form" @submit.prevent="handleSubmit" enctype = "multipart/form-data">
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
          id="descriptiontextarea"
        ></b-form-textarea>
      </b-form-group>
      <!-- Product quantity -->
      <b-form-group label="Quantity">
        <b-form-input type="number" v-model="productData.quantity" required></b-form-input>
      </b-form-group>
      <!-- Product Price -->
      <b-form-group label="Price (USD)">
        <!-- NOTE** step doesnt work that great, but it lets in a float.  WIP -->
        <b-form-input type="number" step="0.01" v-model="productData.price" required></b-form-input>
      </b-form-group>
      <!-- Product weight -->
      <b-form-group label="Weight (kg)">
        <b-form-input type="number" step="0.01" v-model="productData.weight"></b-form-input>
      </b-form-group>
      <!-- Tags -->
      <b-form-group label="Tags (comma-separated)">
        <b-form-textarea
          v-model="tagsString"
          placeholder="Write something..."
          required
          id="tagtextarea"
        ></b-form-textarea>
      </b-form-group>
      <b-form-file 
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ pfile ? file.name : '' }}</div>
      <b-button type="submit" variant="primary" class="submitButton">Submit</b-button>
    </b-form>

    <!-- DELETE LATER
    <hr>
    <h3>Testing Data - delete later</h3>
    <p>Store Name: {{storeToPost}}</p>
    <p>Product Name: {{productData.name}}</p>
    <p>Product description: {{productData.description}}</p>
    <p>Product quantity: {{productData.quantity}}</p>
    <p>Product price: {{productData.price}}</p>
    <p>Product weight: {{productData.weight}}</p>
    <p>Product numbersold: {{productData.numbersold}}</p>
    <p>Product tags: {{productData.tags}}</p>
    -->
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
        tags: [],
        numbersold: 0,
        owner: {
          id: this.storeOwnerId,
          username: this.storeOwnerUser
        },
        store: ""
      },
      storename: "",
      tagsString: "",
      file:"",
      //storeToPost: this.$route.params.storeName
    };
  },
  props: {
    storeToPost: String,
    storeOwnerId: String,
    storeOwnerUser: String
  },

  watch: {
    storeToPost(newVal, oldVal) {
      //console.log(`prop changed old: ${oldVal}, new: ${newVal}`);
      this.productData.store = newVal;
    }
  },

  methods: {

    
    // submit method
    handleSubmit(event) {
      var product_data = new FormData();

      for (var key in this.formData){
          console.log(key + " + " + this.productData[key]);
          product_data.append(key, this.productData[key]);
      }

      product_data.append("file", this.file);


      let tagArray = this.tagsString.split(",");
      this.productData.tags = tagArray;

       const config = {
            headers: {
              'content-type': 'multipart/form-data'
          }
      }
      axios.post(this.$hostname + `/shop/${this.storeToPost}/dashboard/addproducts`,
                  product_data,
                  config
        )
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
          } else if (response.status === 204) {
            alert("ERROR: 204 recvd. Store does not exist");
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
#tagtextarea {
  resize: none;
  height: 100px;
}

#descriptiontextarea {
  resize: none;
  height: 225px;
  overflow-y: scroll;
}
</style>


