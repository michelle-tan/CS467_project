<!-- 
ProductCard.vue
Accepts as props: an object that is a product that has {name, price}

TO DO
Fix for images and rating once they are added to the database
-->
<template>
  <div class="productbox">
    <a href="#">
      <div class="thumbnail">
        <img :src="productObject.image" alt="No Image Found" class="img-responsive">
      </div>
    </a>
    <div class="productinfo">
      <div class="producttitle">{{productObject.name || "PRODUCT_NAME"}}</div>
      <div class="productprice">
        <b-button class="float-right detailButton" variant="info">Details</b-button>
        <div class="pricetext">${{productObject.Price || "PRODUCT_PRICE"}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "productCard",
  data() {
    return {
      itemLink: ""
    };
  },
  props: {
    productObject: Object
  }
};
</script>
<style>
img {
  max-width: 100%;
  max-height: 100%;
  align-self: flex-end;
}
.thumbnail {
  /* 250:188 is a 4:3 ratio images will be resized to fit this.*/
  width: 250px;
  height: 188px;
  overflow: hidden;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.productbox {
  background-color: #ffffff;
  padding: 0px;
  box-shadow: 0 8px 6px -6px #999;
  display: inline-block;
  margin: 0px;
}
.productbox:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.productinfo {
  width: 100%;
}

.producttitle {
  font-weight: bold;
  font-size: 1.2em;
  padding: 5px 0 5px 0;
}

.productprice {
  border-top: 1px solid #dadada;
  padding-top: 5px;
  padding-bottom: 5px;
}

.pricetext {
  font-weight: bold;
  font-size: 1em;
}

.detailButton {
  height: 100% !important;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>


