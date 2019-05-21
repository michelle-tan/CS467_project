<template>
  <div>
    <h3>Product Description</h3>
    <p>In Stock: {{qty || this.placeholder.qty}} | Weight: {{weight || this.placeholder.weight}} oz</p>
    <p>{{desc || this.placeholder.desc}}</p>
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
    desc: String,
    weight: Number,
    qty: Number
  }
};
</script>

<style>
</style>


