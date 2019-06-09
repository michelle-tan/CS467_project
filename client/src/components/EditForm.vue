<template>
  <div class="container">
    <h1>Editing {{productToEdit}}</h1>
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
          id="descriptiontextarea"
        ></b-form-textarea>
      </b-form-group>
      <!-- Product quantity -->
      <b-form-group label="Quantity">
        <b-form-input type="number" v-model="productData.Quantity" required></b-form-input>
      </b-form-group>
      <!-- Product Price -->
      <b-form-group label="Price">
        <!-- NOTE** step doesnt work that great, but it lets in a float.  WIP -->
        <b-form-input type="number" step="0.01" v-model="productData.Price" required></b-form-input>
      </b-form-group>
      <!-- Product weight -->
      <b-form-group label="Weight">
        <b-form-input type="number" step="0.01" v-model="productData.Weight"></b-form-input>
      </b-form-group>

      <!-- Tags -->
      <b-form-group label="Tags (comma-separated)">
        <b-form-textarea
          v-model="productData.tags"
          placeholder="Write something..."
          id="tagtextarea"
        ></b-form-textarea>

      <!-- Image -->
       <b-form-group label="Store Image:">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
      <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      </b-form-group>
      
      <b-button type="submit" variant="primary" class="submitButton">Submit</b-button>
    </b-form>
    <hr>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditProductForm",
  data() {
    return {
      productToEdit: "",
      productData: {},
      productID: "",
      tagsString: "",
      file:""
    };
  },
  props: {
    productPropId: String
  },
  watch: {
    productPropId(newVal, oldVal) {
      console.log(`prop changed old: ${oldVal}, new: ${newVal}`);
      this.productID = newVal;
      axios({
        method: "GET",
        url: this.$hostname + "/shop/editProduct/" + this.productID
      })
        .then(res => {
          // response is a large thing, we want the data.
          //console.log("there is data");
          if (res.status == 200) {
            delete res.data.comments;
            delete res.data.ratings;
            delete res.data.__v;

            this.$set(this.$data, "productData", res.data);
            this.productToEdit = res.data.name;
          } else {
            //this.$set(this.$data, "errorDisplay", true);
            console.log(`Error: ${res.status} received`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {},
  methods: {
    handleSubmit() {
      if (this.handleSubmitOverride) {
        this.handleSubmitOverride();
      } else {
        var product_data = new FormData();

        for (var key in this.productData) {
          product_data.append(key, this.productData[key]);
        }
        product_data.append("file", this.file);


        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };

      
        axios
          .post(this.$hostname + "/shop/updateProduct/" + this.productID, product_data, config)
          .then(response => {
            if (response.status === 200) {
            this.$router.push("/account/manageStore");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
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