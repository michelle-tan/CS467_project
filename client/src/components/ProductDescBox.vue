<template>
  <div>
    <h3>Product Description</h3>
    <p>In Stock: {{productObject.Quantity || this.placeholder.qty}} | Weight: {{productObject.Weight || this.placeholder.weight}} oz</p>
    <p>{{productObject.description || this.placeholder.desc}}</p>
  </div>
</template>

<script>
export default {
  name: "ProductDescBox",
  data() {
    return {
      placeholder: {
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum gravida lacus, vel ultrices nibh efficitur vel. Nulla quis scelerisque erat, nec semper orci.",
        weight: "XX",
        qty: "XX.XX"
      }
    };
  },
  props: {
    productObject: Object
    /*
    USING FROM THE OBJECT
    desc: String,
    weight: Number,
    qty: Number
    */
  }
};
</script>

<style>
</style>


