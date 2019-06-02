<template>
    <div class="container">
    <h1 >Editing {{productToEdit}}</h1>
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
      <b-form-group label="Tags">
        <b-form-textarea v-model="tagsString" placeholder="Write something..."></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary" class="submitButton">Submit</b-button>
    </b-form>
    <hr>

  </div>

</template>

<script>

import axios from "axios"


export default{
    data(){
        return{
            productToEdit: '',
            productData: {

            },
            productID: "",
            tagsString: ""

        }
    },
    created(){
        axios({
        method: "GET",
        url: this.$hostname + "/shop/editProduct/" + this.$route.params.productId
      })
        .then(res => {
          // response is a large thing, we want the data.
          
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
    },
    methods:{
        handleSubmit(){
            if (this.handleSubmitOverride) {
                this.handleSubmitOverride();
            }else{
            axios({
                method: "POST",
                url: this.$hostname + "/shop/updateProduct/" + this.$route.params.productId,
                data: { formData: this.productData }
            })
            .then(response => {
                if (response.status === 200) {
                this.$router.push('/account/manageStore');
                console.log(response)
                } 
            })
            .catch(err => {
                
                console.log(err);
            });
            }
        }
    }


}

</script>