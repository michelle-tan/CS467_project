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
            <h3>Product description(Component B)</h3>
          </div>
        </b-col>
        <b-col cols="5" class="bordera">
          <div>
            <h3>Product Title (Component C)</h3>
            <h3>Link to store front (Component C)</h3>
            <h3>Product Rating (Component C)</h3>
            <h3>Product Price (Component C)</h3>
          </div>
          <br>
          <br>
          <div>
            <h3>Add to cart div (Component D)</h3>
          </div>
          <br>
          <br>
          <div>
            <h3>Reviews (Component E)</h3>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div>
      <h3>Related Products(Product Ribbon)</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpecificProduct"
};
</script>

<style>
.bordera {
  border: 1px solid black;
}
</style>


