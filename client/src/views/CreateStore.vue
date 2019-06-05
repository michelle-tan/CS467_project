<!-- Form to create a store linkes to shop/createstore route in stores.js 
    RIght now anyone can create a store without logging in will add the middle ware to back
    end so the user cant submit unless the user is logged in.

    THIS WILL BE A COMPONENT -- IN VIEWS FOR TESTING
-->


<template>
  <div class="container">
    <h1>Sell your goods on Kuma!</h1>
    <br>
    <div style="text-align: center;">
      <img
        src="https://cdn.pixabay.com/photo/2017/08/07/19/46/shop-2607121_960_720.jpg"
        style="width: 75%;"
      >
    </div>
    <br>
    <h5
      id="blurb"
    >At Kuma, we strive to make buying and selling as efficient as possible for the customers and shop owners! Why don't you give us a shot and sell your goods here?</h5>
    <br>
    <hr>
    <h5>Instructions</h5>
    <p>
      Simply create a store name and description. This store will be tied to your personal account. You can access it through the member's account page.
      <br>You may have more than one store if you wish!
      <br>Remember, try to be descriptive when creating your store to better reflect you and your products!
    </p>

    <hr>
    <b-form ref="form" @submit.prevent="handleSubmit">
      <b-form-group label="Storename:">
        <b-form-input
          type="text"
          required
          placeholder="Choose a unique storename"
          v-model="formData.storename"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Description:">
        <b-form-textarea
          type="textarea"
          ref="text"
          required
          placeholder="Description:"
          v-model="formData.description"
          id="textarea"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group label="Store Image:">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
      <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      <br>
      <!--
    <label> Upload File </label>
    <input 
      type = "file"
      ref = "file"
      @change = "onSelect"
    >
      -->
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router.js";

export default {
  props: {
    handleSubmitOverride: Function
  },
  data: () => {
    return {
      formData: {
        storename: "",
        description: ""
      },
      file: ""
    };
  },
  mounted: function() {
    this.isMounted = true;
    // assigns the form its data if passed as props
    if (this.userData) {
      Object.assign(this.formData, this.userData);
    }
  },

  computed: {
    //       validateStorename(){
    // insert call to check if username is taken?
    //       },
  },
  methods: {
    handleSubmit() {
      var form_data = new FormData();

      for (var key in this.formData) {
        console.log(key + " + " + this.formData[key]);
        form_data.append(key, this.formData[key]);
      }

      form_data.append("file", this.file);

      if (this.handleSubmitOverride) {
        this.handleSubmitOverride();
      } else {
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };
        axios
          .post(this.$hostname + "/shop/createstore", form_data, config)
          .then(response => {
            if (response.status === 200) {
              console.log(response);
              router.push("/");
            }
          })
          .catch(err => {
            console.log(err);
          });
        /*axios({
          method: "POST",
          url: this.$hostname + "/shop/createstore",
          data: {form_data},
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response);
              router.push("/");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }*/
      }
    }
  }
};
</script>
<style>
#blurb {
  font-style: italic;
}

#textarea {
  resize: none;
  height: 225px;
  overflow-y: scroll;
}

.container {
  padding-bottom: 20px;
}
</style>