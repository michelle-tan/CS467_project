<template>
  <div>
    <h1 id="productName">{{name || this.placeholder.name}}</h1>
    <p>{{storeLink || this.placeholder.storeLink}}</p>
    <p>{{rating || this.placeholder.rating}}</p>
    <h3>${{price || this.placeholder.price}}</h3>
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
      }
    };
  },
  props: {
    name: String,
    storeLink: Number,
    rating: Number,
    price: Number
  }
};
</script>

<style>
#productName {
}
</style>


