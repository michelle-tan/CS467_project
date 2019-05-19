<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="7" class="bordera">
          <div>
            <h3>Carousel(Component A)</h3>
          </div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <div>
            <ProductDescBox/>
          </div>
          <div>
            <h3>Reviews (Component E)</h3>
          </div>
        </b-col>
        <b-col cols="5" class="bordera">
          <ProductInfoBox/>
          <br>
          <br>
          <div>
            <h3>Add to cart div (Component D)</h3>
          </div>
          <br>
          <br>
        </b-col>
      </b-row>
    </b-container>
    <div>
      <h3>Related Products(Product Ribbon)</h3>
    </div>
    <div>
      <h4>Testing the data</h4>
      <p>Name: {{productObject.name}}</p>
      <p>Desc: {{productObject.description}}</p>
      <p>Img link: {{productObject.image}}</p>
      <p>QTY: {{productObject.Quantity}}</p>
      <p>Weight: {{productObject.Weight}}</p>
      <p>Price: {{productObject.Price}}</p>
    </div>
  </div>
</template>

<script>
import ProductDescBox from "@/components/ProductDescBox.vue";
import ProductInfoBox from "@/components/ProductInfoBox.vue";
export default {
  name: "SpecificProduct",
  components: { ProductDescBox, ProductInfoBox },
  data() {
    return {
      productObject: {
        ratings: [],
        name: "Test Item for Spec. Product Page",
        description:
          "This is a description for the test item located on the specific product page. It is hardcoded into the data section of the component.",
        image:
          "https://timedotcom.files.wordpress.com/2015/06/521811839-copy.jpg",
        Quantity: 100,
        Weight: 1,
        Price: 100.32
      }
    };
  }
};
</script>

<style>
.bordera {
  border: 1px solid black;
}

.bv-example-row {
  padding-top: 25px;
}
</style>


