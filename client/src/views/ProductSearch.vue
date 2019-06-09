<template>
  <div class="container">
    <h1>Seach Results</h1>
    <hr>
    <ProductGrid :productObjectArray="searchResultProducts" v-if="valid"/>
    <div v-if="errorMsgShow" class="errorMsg">
      <h4>Wer're Sorry, we couldnt find any results for that search.</h4>
      <img
        id="lookingImg"
        src="https://blog.clearlynext.com/wp-content/uploads/2017/05/find-featured.png"
      >
      <br>
      <br>
      <b-button variant="primary">
        <b-link to="/" id="linkText">HOME</b-link>
      </b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductGrid from "@/components/ProductGrid.vue";
export default {
  name: "ProductSearch",
  components: { ProductGrid },
  data() {
    return {
      searchResultProducts: [],
      valid: false,
      errorMsgShow: false,
      tagArray: []
    };
  },
  watch: {
    tagArray(newVal, oldVal) {
      // First check if there is an "exact search", where all the keywords are present in the item
      axios({
        method: "GET",
        url: this.$hostname + `/products/searchProducts`,
        params: {
          array: newVal
        }
      })
        .then(res => {
          if (res.data.length === 0) {
            // If there is no "exact match" look for related items
            axios({
              mthod: "GET",
              url: this.$hostname + `/products/relatedProducts`,
              params: {
                array: newVal
              }
            }).then(res => {
              if (res.data.length === 0) {
                console.log("no results");
                this.$set(this.$data, "errorMsgShow", true);
              } else {
                console.log("in matches");
                this.$set(this.$data, "searchResultProducts", res.data);
                this.$set(this.$data, "valid", true);
              }
            });
          } else {
            this.$set(this.$data, "searchResultProducts", res.data);
            this.$set(this.$data, "valid", true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$nextTick(() => {
      this.$set(this.$data, "tagArray", this.$route.query.tagArray);
    });
  }
};
</script>

<style>
.container {
  padding-top: 40px;
}

.errorMsg {
  text-align: center;
}

#lookingImg {
  width: 100%;
}

#linkText {
  color: white;
}
</style>


