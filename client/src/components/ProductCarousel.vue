<template>
  <div id="imageContainer">
    <!-- TEST -->
    <div @click="showModal=true">
      <img :src="getPathToSrc(this.image)" alt="No Image Found" id="productImage">
    </div>

    <b-modal id="imagemodal" v-model="showModal " hide-footer size="lg">
      <img :src="getPathToSrc(this.image)" alt="no image found" id="modalImage">
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ProductImage",
  data() {
    return {
      showModal: false
    };
  },
  props: {
    image: ""
  },
  methods: {
    /*********************** */
    getPathToSrc(src) {
      return this.$hostname + "/images/products/" + src;
    }

    /******************************** */
  }
};
</script>

<style>
#imageContainer {
  margin-top: 10px;
}
#productImage {
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#modalImage {
  width: 100%;
  border-radius: 5px;
}

#productImage:hover {
  opacity: 0.7;
}
</style>


