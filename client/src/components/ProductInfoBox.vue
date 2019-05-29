<template>
  <div>
    <h1 id="productName">{{productObject.name || this.placeholder.name}}</h1>
    <b-link :href="storeOwnerLink">{{productObject.store}}</b-link>
    <p>{{productObject.rating || this.placeholder.rating}}</p>
    <h3>${{productObject.Price || this.placeholder.price}}</h3>
  </div>
</template>

<script>
export default {
  name: "ProductInfoBox",
  data() {
    return {
      placeholder: {
        name: "PLACEHOLDER_NAME",
        storeLink: "PLACEHOLDER_LINK",
        rating: "PLACEHOLDER_RATING",
        price: "XX.XX"
      },
      storeOwnerLink: ""
    };
  },
  props: {
    productObject: Object
  },
  created() {
    this.$nextTick(() => {
      let link = `/products/Store/${this.productObject.store}`;
      this.$set(this.$data, "storeOwnerLink", link);
    });
  }
};
</script>

<style>
#productName {
}
</style>


