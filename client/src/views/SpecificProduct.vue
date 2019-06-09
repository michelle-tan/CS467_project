<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="7" class="bordera">
          <ProductImage :image="productObject.image"></ProductImage>
          <br>
          <br>
          <hr>
          <ProductDescBox :productObject="productObject"/>
        </b-col>

        <b-col md="5" order="1" order-md="2" class="bordera">
          <ProductInfoBox :productObject="productObject"/>
          <br>
          <hr>
          <div>
            <h3>Add to Cart</h3>

            <div class="text-danger" v-show="showQtyError">
              <small>{{validateQty.message}}</small>
            </div>
            <b-form-input v-model="qty" type="number" id="qtyInput" :state="validateQty.isValid"></b-form-input>
            <b-button @click="addToCart" :disabled="showQtyError">Add to Cart</b-button>
          </div>
          <br>
          <div id="boilerplate">
            <hr>
            <h5 id="shipping">Shipping & Returns</h5>
            <p>
              Item ships from the USA within 2-5 business days.
              <br>Returns and exchanges accepted.
              <br>Exceptions may apply. Contact Seller for more information.
            </p>
          </div>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col class="bordera">
          <h3>Reviews (Component E)</h3>
          <b-alert
            v-model="showNotLoggedInAlert"
            variant="danger"
            dismissible
          >Please be logged in to perform this action!</b-alert>
          <b-button @click="toggleReviewModal">Add review</b-button>
          <b-modal title="Add a review:" v-model="showAddReviewModal" centered>
            <ReviewForm :handleSubmit="handleReviewSubmit"/>
            <div slot="modal-footer"/>
          </b-modal>
          <div v-for="(review,index) in productReviews" :key="review._id">
            <ReviewCard :review="review" :index="index" :user_id="sessionData.userinfo.user_id"/>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <hr>

    <h3>Related Products</h3>
    <ProductGrid :productObjectArray="relatedProducts" :itemsToDisplay="8" v-if="valid"/>

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
import ReviewForm from "@/components/ReviewForm.vue";
import ProductDescBox from "@/components/ProductDescBox.vue";
import ProductInfoBox from "@/components/ProductInfoBox.vue";
import ProductImage from "@/components/ProductCarousel.vue";
import ProductGrid from "@/components/ProductGrid.vue";
import ReviewCard from "@/components/ReviewCard.vue";
export default {
  name: "SpecificProduct",
  components: {
    ProductDescBox,
    ProductInfoBox,
    ProductImage,
    ProductGrid,
    ReviewForm,
    ReviewCard
  },
  props: {
    sessionData: Object
  },
  data() {
    return {
      productObject: {},
      qty: 1,
      showAddReviewModal: false,
      showNotLoggedInAlert: false,
      relatedProducts: [],
      valid: false,
      showQtyError: false,
      productReviews: []
    };
  },
  computed: {
    validateQty() {
      if (this.qty > this.productObject.Quantity) {
        this.showQtyError = true;
        return {
          isValid: false,
          message: "Quantity is greater than current stock"
        };
      } else if (this.qty <= 0) {
        this.showQtyError = true;
        return { isValid: false, message: "Quantity cannot be 0" };
      }
      this.showQtyError = false;
      return { isValid: true, message: "" };
    }
  },
  created() {
    this.$nextTick(() => {
      axios({
        method: "GET",
        url: this.$hostname + `/products/${this.$route.params.productid}`
      })
        .then(res => {
          //console.log("res :", res);
          if (res.status == 200) {
            //console.log("200 recvd");
            this.$set(this.$data, "productObject", res.data);
            axios({
              method: "GET",
              url: this.$hostname + `/products/relatedProducts`,
              params: {
                array: this.productObject.tags
              }
            })
              .then(res => {
                //console.log(res);
                this.$set(this.$data, "relatedProducts", res.data);
                this.valid = true;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log(`Error: ${res.status} rcvd`);
          }
        })
        .catch(err => {
          console.log("ERROR CAUGHT");
          console.log(err);
        });

      // get review for the product
      axios
        .get(this.$hostname + "/reviews/byProduct/" + this.productObject._id)
        .then(response => {
          console.log("reviews: ");
          console.log(response.data);
          this.$set(this.$data, "productReviews", response.data);
        });
    });
  },
  methods: {
    lowerBound() {
      let relatedCount = this.relatedProducts.length;
      //console.log(relatedCount);
      if (relatedCount < 8) {
        return relatedCount;
      } else {
        return 8;
      }
    },
    addToCart() {
      if (this.qty > this.productObject.Quantity) {
      } else {
        axios({
          method: "PATCH",
          url: this.$hostname + "/cart",
          data: {
            item: {
              id: this.productObject._id,
              name: this.productObject.name,
              price: this.productObject.Price,
              image: this.productObject.image,
              qty: this.qty,
              price: this.productObject.Price
            },
            storeInfo: {
              sellerId: this.productObject.owner.id,
              storeName: this.productObject.store,
              username: this.productObject.owner.username
            }
          }
        })
          .then(result => {
            console.log(result);
            this.$emit("update:sessionData", { cart: result.data });
            this.qty = 1;
          })
          .catch(err => {
            console.log("err :", err);
          });
      }
    },
    handleReviewSubmit(formData) {
      var data = new FormData();

      formData.author = {
        id: this.sessionData.userinfo.user_id,
        username: this.sessionData.userinfo.username
      };

      formData.product = {
        id: this.productObject._id,
        name: this.productObject.name
      };

      data.append("formData", JSON.stringify(formData));

      for (var i = 0; i < formData.images.length; i++) {
        data.append("images", formData.images[i]);
      }

      axios({
        method: "POST",
        url: this.$hostname + "/reviews/" + this.productObject._id,
        data: data,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(response => {
          //console.log("response", response);
          if (response.status === 200) {
            this.showAddReviewModal = false;
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    toggleReviewModal() {
      if (this.sessionData.loggedIn) {
        this.showAddReviewModal = true;
      } else {
        this.showNotLoggedInAlert = true;
      }
    }
  }
};
</script>

<style>
#qtyInput {
  width: 50%;
}

.bordera {
  border: 1px solid black;
}

.bv-example-row {
  padding-top: 25px;
}
#shipping {
  font-weight: bold;
}
</style>


