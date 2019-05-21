<template>
  <div class="container">
    <h1 v-if="valid">Storefront for: {{storeName}}</h1>
    <br>
    <br>
    <StoreFrontBanner/>
    <hr>

    <ProductGrid :productObjectArray="storeProducts" v-if="valid"/>
    <h1 v-if="errorDisplay">Error: Shopname {{storeName}} does not exist.</h1>
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
      axios({
        method: "GET",
        url: this.$hostname + `/products/${this.$route.params.storename}/all`
      })
        .then(res => {
          if (res.status == 200) {
            console.log("200 rcvd");
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


