<template>
  <div class="container">
    <h1>This is the testing page of the components</h1>
    <hr>
    <h4>Product Ribbon</h4>
    <ProductRibbon/>
    <br>
    <h4>Product Card</h4>
    <ProductCard/>
    <br>
    <br>
    <h4>Product Grid - Will not use</h4>
    <ProductGrid/>
    <br>
    <h4>Featured Product</h4>
    <FeaturedProduct/>

    <br>
    <br>
  </div>
</template>
<script>
import ProductRibbon from "@/components/ProductRibbon.vue";
import ProductCard from "@/components/ProductCard.vue";
import ProductGrid from "@/components/ProductGrid.vue";
import FeaturedProduct from "@/components/FeaturedProduct.vue";
export default {
  name: "testComponents",
  components: { ProductRibbon, ProductCard, ProductGrid, FeaturedProduct }
};
</script>

