<!-- Form to create a store linkes to shop/createstore route in stores.js 
    RIght now anyone can create a store without logging in will add the middle ware to back
    end so the user cant submit unless the user is logged in.

    THIS WILL BE A COMPONENT -- IN VIEWS FOR TESTING
-->


<template>
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
        placeholder="Description"
        v-model="formData.description"
      ></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
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
      isMounted: false
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
      if (this.handleSubmitOverride) {
        this.handleSubmitOverride();
      } else {
        axios({
          method: "POST",
          url: this.$hostname + "/shop/createstore",
          data: { ...this.formData }
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
      }
    }
  }
};
</script>