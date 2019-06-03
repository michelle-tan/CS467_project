<template>
  <div>
    <img :src="setBackgroundImage" alt="Banner-Image" id="bannerImage">

    <b-container class="bannerWrapper">
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
            {{this.shopAddress || "SHOP_CITY, SHOP_STATE"}}
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "StoreFrontBanner",
  data() {
    return {
      shopImage: "",
      shopName: "",
      shopDesc: "",
      shopAddress: "",
      shopSales: 0,
      ownerImage: "",
      ownerName: ""
    };
  },
  props: {
    storename: String
  },

  created() {
    // obtain the store owners information
    // store info
    // user info

    this.$nextTick(() => {
      axios
        .get(this.$hostname + `/shop/lookup/${this.storename}`)
        .then(res => {
          this.$set(this.$data, "shopName", res.data.name);
          this.$set(this.$data, "shopDesc", res.data.description);
          this.$set(this.$data, "shopImage", res.data.image_path);
          let ownerId = res.data.owner.id;
          //console.log("owner id is: " + ownerId);
          return axios.get(this.$hostname + `/getuser/${ownerId}`);
        })
        .then(res => {
          let fullName = `${res.data.firstName} ${res.data.lastName}`;
          let shopaddr = `${res.data.address.city}, ${res.data.address.state}`;
          let ownerImg = res.data.profile_image;
          this.$set(this.$data, "ownerName", fullName);
          this.$set(this.$data, "ownerImage", ownerImg);
          this.$set(this.$data, "shopAddress", shopaddr);
        })
        .catch(err => {
          // handle err
        });
    });
  },
  computed: {
    setBackgroundImage() {
      let link = "https://picsum.photos/2000/325";
      return link;
    }
  }
};
</script>

<style>
.bannerWrapper {
  margin-top: 10px;
}
#bannerImage {
  width: 100%;
  height: 325px;
}

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
