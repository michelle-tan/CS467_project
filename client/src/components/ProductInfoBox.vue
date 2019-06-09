<template>
  <div>
    <h1 id="productName">{{productObject.name || this.placeholder.name}}</h1>
    <b-link :to="storeOwnerLink">{{productObject.store}}</b-link>
    <br>
    <font-awesome-icon icon="star" v-for="n in numWholeStars" :key="'ws'+n"/>
    <font-awesome-icon icon="star-half-alt" v-for="n in numHalfStars" :key="'hs' + n"/>
    <font-awesome-icon :icon="['far', 'star']" v-for="n in numEmptyStars" :key="'es' + n"/>
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
        price: "0.00"
      },
      storeOwnerLink: ""
    };
  },
  props: {
    productObject: Object,
    aggregateRating: Number
  },
  computed: {
    numWholeStars() {
      return Math.floor(this.aggregateRating);
    },
    numHalfStars() {
      return Math.ceil(this.aggregateRating) -
        Math.floor(this.aggregateRating) ===
        1
        ? 1
        : 0;
    },
    numEmptyStars() {
      return 5 - Math.ceil(this.aggregateRating);
    }
  },

  beforeUpdate() {
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


