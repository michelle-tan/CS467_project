<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div class="shopImgContainer">
          <img :src="this.shopImage" alt="No Image Found" class="shopImg img-responsive">
        </div>
      </b-col>
      <b-col cols="8">
        <div>
          <h4 id="shopname">{{this.shopName || "SHOP_NAME"}}</h4>
        </div>
        <div id="description">{{this.shopDesc || "SHOP_DESC"}}</div>
        <div id="salesCount">{{this.shopSales}} Sales</div>
        <div>
          <font-awesome-icon icon="map-marker-alt"/>
          {{this.shopCity || "SHOP_CITY"}}, {{this.shopState || "SHOP_STATE"}}
        </div>
      </b-col>
      <b-col class="text-center">
        <div>
          <h5>Shop Owner</h5>
        </div>
        <div class>
          <img :src="this.ownerImage" alt="No Image Found" class="ownerImg img-responsive">
        </div>

        <div>{{this.ownerName || "OWNER_NAME"}}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "StoreFrontBanner",
  components: {},
  data() {
    return {
      shopImage:
        "https://cdn.bulbagarden.net/upload/f/f5/Detective_Pikachu_artwork_2.png",
      shopName: "SteveStore",
      shopDesc:
        "Testing the banner for the store front, currently data is hardcoded",
      shopCity: "Hoboken",
      shopState: "New Jersey",
      shopSales: 0,
      ownerImage:
        "https://cdn.bulbagarden.net/upload/f/f5/Detective_Pikachu_artwork_2.png",
      ownerName: "Detective Pikachu"
    };
  }
};
</script>

<style>
#shopname {
  font-weight: bold;
}
#description {
  font-style: italic;
}
.ownerImg {
  border-radius: 50%;
  height: 100px;
  width: 100px;
}
.shopImg {
  max-width: 100%;
  max-height: 100%;
  align-self: flex-end;
}
.shopImgContainer {
  max-width: 250px;
  max-height: 250px;
  overflow: hidden;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
</style>
