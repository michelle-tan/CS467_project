<!-- 
ProductCard.vue
Accepts as props: an object that is a product that has {name, price}
-->
<template>
  <div class="productbox">
    <a href="#">
      <img src="http://placehold.it/460x250/e67e22/ffffff&text=HTML5" class="img-responsive">
    </a>
    <div class="productinfo">
      <div class="producttitle">{{productObject.name || "PLACEHOLDER_name"}}</div>
      <div class="productprice">
        <div class="float-right">
          <a href="#" class="btn btn-danger btn-sm" role="button">BUY</a>
        </div>
        <div class="pricetext">{{productObject.price || "PLACEHOLDER_price"}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "productCard",
  props: {
    productObject: Object
  }
};
</script>
<style>
img {
  max-width: 100%;
}
.productbox {
  background-color: #ffffff;
  padding: 0px;
  box-shadow: 0 8px 6px -6px #999;
  width: 250px;
  height: 320;
  display: inline-block;
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
</style>


