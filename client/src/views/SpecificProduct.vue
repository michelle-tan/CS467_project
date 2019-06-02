<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="7" class="bordera">
          <div>
            <ProductCarousel></ProductCarousel>
          </div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <div>
            <ProductDescBox :productObject="productObject"/>
          </div>
          <div>
            <h3>Reviews (Component E)</h3>
          </div>
        </b-col>
        <b-col cols="5" class="bordera">
          <ProductInfoBox :productObject="productObject"/>
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
    <!--
    <div>
      <h4>Testing the data</h4>
      <p>Name: {{productObject.name}}</p>
      <p>Desc: {{productObject.description}}</p>
      <p>Img link: {{productObject.image}}</p>
      <p>QTY: {{productObject.Quantity}}</p>
      <p>Weight: {{productObject.Weight}}</p>
      <p>Price: {{productObject.Price}}</p>
    </div>
    -->
  </div>
</template>

<script>
import axios from "axios";
import ProductDescBox from "@/components/ProductDescBox.vue";
import ProductInfoBox from "@/components/ProductInfoBox.vue";
import ProductCarousel from "@/components/ProductCarousel.vue";
export default {
  name: "SpecificProduct",
  components: { ProductDescBox, ProductInfoBox, ProductCarousel },
  data() {
    return {
      productObject: {}
    };
  },
  created() {
    this.$nextTick(() => {
      axios({
        method: "GET",
        url: this.$hostname + `/products/${this.$route.params.productid}`
      })
        .then(res => {
          if (res.status == 200) {
            console.log("200 recvd");
            this.$set(this.$data, "productObject", res.data);
          } else {
            console.log(`Error: ${res.status} rcvd`);
          }
        })
        .catch(err => {
          console.log("ERROR CAUGHT");
          console.log(err);
        });
    });
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


