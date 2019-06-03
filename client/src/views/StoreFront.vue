<template>
  <div>
    <StoreFrontBanner :storename="storeName"/>
    <div class="container">
      <hr>
      <ProductGrid :productObjectArray="storeProducts" v-if="valid"/>
      <h1 v-if="errorDisplay">Error: Shopname {{storeName}} does not exist.</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductGrid from "@/components/ProductGrid.vue";
import StoreFrontBanner from "@/components/StoreFrontBanner.vue";

export default {
  name: "StoreFront",
  components: {
    ProductGrid,
    StoreFrontBanner
  },
  data() {
    return {
      storeName: this.$route.params.storename,
      storeProducts: [],
      valid: false,
      errorDisplay: false
    };
  },
  props: {},
  mounted() {
    this.$nextTick(() => {
      // Get the products
      axios({
        method: "GET",
        url: this.$hostname + `/shop/${this.$route.params.storename}/products`
      })
        .then(res => {
          if (res.status == 200) {
            //console.log("200 rcvd");
            this.$set(this.$data, "storeProducts", res.data);
            this.$set(this.$data, "valid", true);
          } else {
            this.$set(this.$data, "errorDisplay", true);
            console.log(`Error: ${res.status} received`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
</script>

<style>
</style>


