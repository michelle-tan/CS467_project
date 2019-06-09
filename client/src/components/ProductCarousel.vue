<template>
  <div id="imageContainer">
    <!-- TEST -->
    <img :src="this.image" id="productImage">
  </div>
</template>

<script>
export default {
  name: "ProductImage",
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  props: {
    image: ""
  }
};
</script>

<style>
#imageContainer {
  margin-top: 10px;
}
#productImage {
  width: 100%;
}
</style>


