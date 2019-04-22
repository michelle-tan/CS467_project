<template>
  <div class="container">
    <h1>This is the testing page of the components</h1>
    <hr>

    <br>
    <h4>Product Card</h4>
    <ProductCard :productObject="testobject"/>
    <br>
    <h4>Product Ribbon</h4>
    <ProductRibbon :productObjectArray="productList"/>
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
import ProductRibbon from "@/components/ProductRibbon.vue";
import ProductGrid from "@/components/ProductGrid.vue";

export default {
  name: "testComponents",
  components: { ProductCard, ProductRibbon, ProductGrid },
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

