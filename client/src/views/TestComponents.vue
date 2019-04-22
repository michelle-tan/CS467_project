<template>
  <div class="container">
    <h1>This is the testing page of the components</h1>
    <hr>

    <br>
    <h4>Product Card</h4>
    <ProductCard :productObject="testobject"/>
    <br>
    <h4>Featured Product - Rename to Product Ribbon</h4>
    <FeaturedProduct :productObjectArray="productList"/>
    <br>
    <h4>Product Grid</h4>
    <ProductGrid/>
    <br>

    <br>
    <br>
  </div>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import FeaturedProduct from "@/components/FeaturedProduct.vue";
import ProductGrid from "@/components/ProductGrid.vue";

export default {
  name: "testComponents",
  components: { ProductCard, FeaturedProduct, ProductGrid },
  data() {
    return {
      testobject: { name: "beats headphones", price: "100.50" },
      productList: [
        { name: "beats headphones #1", price: "100.50" },
        { name: "beats headphones #2", price: "100.50" },
        { name: "beats headphones #3", price: "100.50" },
        { name: "beats headphones #4", price: "100.50" },
        { name: "beats headphones #5", price: "100.50" },
        { name: "beats headphones #6", price: "100.50" },
        { name: "beats headphones #7", price: "100.50" },
        { name: "beats headphones #8", price: "100.50" },
        { name: "beats headphones #1", price: "100.50" },
        { name: "beats headphones #2", price: "100.50" },
        { name: "beats headphones #3", price: "100.50" },
        { name: "beats headphones #4", price: "100.50" },
        { name: "beats headphones #5", price: "100.50" },
        { name: "beats headphones #6", price: "100.50" },
        { name: "beats headphones #7", price: "100.50" },
        { name: "beats headphones #8", price: "100.50" }
      ]
    };
  }
};
</script>

