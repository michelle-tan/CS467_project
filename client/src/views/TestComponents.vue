<template>
  <div class="container">
    <h1>This is the testing page of the components</h1>
    <hr>

    <br>
    <h4>Product Card</h4>
    <ProductCard/>
    <br>

    <h4>Featured Product</h4>
    <FeaturedProduct/>

    <br>
    <br>
  </div>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import FeaturedProduct from "@/components/FeaturedProduct.vue";
export default {
  name: "testComponents",
  components: { ProductCard, FeaturedProduct }
};
</script>

