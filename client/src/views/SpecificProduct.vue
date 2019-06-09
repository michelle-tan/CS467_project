<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <!-- LEFT COLUMN -->
        <b-col cols="7">
          <ProductImage :image="productObject.image"></ProductImage>
          <br>
          <br>
          <hr>
          <ProductDescBox :productObject="productObject"/>
        </b-col>

        <!-- RIGHT COLUMN -->
        <b-col md="5" order="1" order-md="2">
          <ProductInfoBox :productObject="productObject" :aggregateRating="aggregateRating"/>
          <hr>
          <div>
            <h3>Add to Cart</h3>
            <div class="text-danger" v-show="showQtyError">
              <small>{{validateQty.message}}</small>
            </div>
            <b-form-input v-model="qty" type="number" id="qtyInput" :state="validateQty.isValid"></b-form-input>
            <b-button @click="addToCart" :disabled="showQtyError">Add to Cart</b-button>
            <b-alert v-model="addedToCartAlert" dismissable variant="success">{{cartAlertMessage}}</b-alert>
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

          <!--
          <div>
            <h3>Add to cart div</h3>
            <b-input v-model="qty" type="number"/>
            <b-alert v-model="addedToCartAlert" dismissable variant="success">{{cartAlertMessage}}</b-alert>
            <b-button @click="addToCart">Add to Cart</b-button>
          </div>
          -->
        </b-col>
      </b-row>

      <hr>
      <b-row>
        <b-col>
          <h3>Reviews</h3>
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
    <div>
      <h3>Related Products</h3>
      <ProductGrid :productObjectArray="relatedProducts" v-if="valid"/>
    </div>
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

      productReviews: [],
      addedToCartAlert: false,
      cartAlertMessage: "",

      showQtyError: false,
      productReviews: [],
      aggregateRating: 0
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
          //console.log("res :", res.data);
          if (res.status == 200) {
            //console.log("200 recvd");
            this.$set(this.$data, "productObject", res.data);
          } else {
            console.log(`Error: ${res.status} rcvd`);
          }

          // convert tags into string
          let tagString = this.productObject.tags.join(" ");

          axios({
            method: "GET",
            url: this.$hostname + `/products/relatedProducts`,
            params: {
              q: tagString
            }
          }).then(res => {
            console.log(res.data);
            this.$set(this.$data, "relatedProducts", res.data);
            this.valid = true;

            axios
              .get(
                this.$hostname + "/reviews/byProduct/" + this.productObject._id
              )
              .then(response => {
                this.$set(this.$data, "productReviews", response.data);
              }); // END INNER THEN
          }); // END Middle THEN
        }) // END OUTER THEN
        .catch(err => {
          console.log(err);
        })
        .catch(err => {
          console.log(`Error fetching related ${err}`);
        });
    });

    // get reviews for the product
    axios
      .get(
        this.$hostname + "/reviews/byProduct/" + this.$route.params.productid
      )
      .then(response => {
        this.$set(this.$data, "productReviews", response.data);
      })
      .catch(err => {
        console.log(`Error with review fetching: ${err}`);
      });
    // get reviews for the product

    // get the aggregate rating for the product
    axios
      .get(
        this.$hostname +
          `/reviews/averageRating/${this.$route.params.productid}`
      )
      .then(response => {
        //console.log(response.data);
        this.$set(this.$data, "aggregateRating", response.data.aggregateRating);
      });
    // get the aggregate rating for the product
  },
  methods: {
    /* LOWER BOUND */
    lowerBound() {
      let relatedCount = this.relatedProducts.length;
      //console.log(relatedCount);
      if (relatedCount < 8) {
        return relatedCount;
      } else {
        return 8;
      }
    },
    /* *************** */

    /* ADD TO CART */
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
            this.cartAlertMessage = this.qty + " units added to cart!";
            this.$emit("update:sessionData", { cart: result.data });
            this.addedToCartAlert = true;
            this.qty = 1;
          })
          .catch(err => {
            console.log("err :", err);
          })

          .then(result => {
            //console.log(result);
            this.$emit("update:sessionData", { cart: result.data });
            this.qty = 1;
          })
          .catch(err => {
            console.log("err :", err);
          });
      }
    },
    /************************************** */

    /*********************************** */
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
    /******************************************** */

    /************************************ */
    toggleReviewModal() {
      if (this.sessionData.loggedIn) {
        this.showAddReviewModal = true;
      } else {
        this.showNotLoggedInAlert = true;
      }
    }
    /************************************** */
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

