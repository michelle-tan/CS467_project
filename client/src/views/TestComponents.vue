<template>
  <div class="container">
    <h1>This is the testing page of the components</h1>
    <hr>

    <br>
    <h4>Product Card</h4>
    <div id="test">
      <ProductCard :productObject="testobject"/>
    </div>
    <br>
    <h4>Product Ribbon</h4>
    <ProductRibbon :productObjectArray="productList"/>

    <br>
    <h4>Product Grid TEST</h4>
    <ProductGridTEST :productObjectArray="productList"/>

    <br>
    <br>
  </div>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import ProductRibbon from "@/components/ProductRibbon.vue";
import ProductGridTEST from "@/components/ProductGridTEST.vue";

export default {
  name: "testComponents",
  components: { ProductCard, ProductRibbon, ProductGridTEST },
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
        { name: "beats headphones #9", price: "100.50" },
        { name: "beats headphones #10", price: "100.50" },
        { name: "beats headphones #11", price: "100.50" },
        { name: "beats headphones #12", price: "100.50" },
        { name: "beats headphones #13", price: "100.50" },
        { name: "beats headphones #14", price: "100.50" },
        { name: "beats headphones #15", price: "100.50" },
        { name: "beats headphones #16", price: "100.50" },
        { name: "beats headphones #17", price: "100.50" },
        { name: "beats headphones #18", price: "100.50" },
        { name: "beats headphones #19", price: "100.50" },
        { name: "beats headphones #20", price: "100.50" },
        { name: "beats headphones #21", price: "100.50" }
      ]
    };
  }
};
</script>

<style>
#test {
  width: 250px;
}
</style>


