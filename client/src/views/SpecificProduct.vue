<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="7" class="bordera">
          <ProductCarousel></ProductCarousel>

          <br>
          <br>
          <hr>
          <div>
            <ProductDescBox :productObject="productObject"/>
            <hr>
          </div>
          <div>
            <h3>Reviews (Component E)</h3>
            <b-alert v-model="showNotLoggedInAlert" variant="danger" dismissible>
        Please be logged in to perform this action!
          </b-alert>
              <b-button @click="toggleReviewModal">Add review</b-button>
        <b-modal
            title="Add a review:"
            v-model="showAddReviewModal"
            centered
        >
            <ReviewForm
                :handleSubmit="handleReviewSubmit"
            />
            <div slot="modal-footer"/>
        </b-modal>
        
          </div>
        </b-col>
        <b-col cols="5" class="bordera">
          <ProductInfoBox :productObject="productObject"/>
          <br>
          <hr>
          <div>
            <h3>Add to cart div (Component D)</h3>
                <b-input
                v-model="qty"
                type="number"
                />
                <b-button @click="addToCart">Add to Cart</b-button>
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
            <hr>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div>
      <h3>Related Products(Product Ribbon)</h3>
    </div>
    <ProductGrid :productObjectArray="relatedProducts" v-if="valid"/>

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
import ReviewForm from '@/components/ReviewForm.vue'
import ProductDescBox from "@/components/ProductDescBox.vue";
import ProductInfoBox from "@/components/ProductInfoBox.vue";
import ProductCarousel from "@/components/ProductCarousel.vue";
import ProductGrid from "@/components/ProductGrid.vue";
export default {
  name: "SpecificProduct",
  components: { ProductDescBox, ProductInfoBox, ProductCarousel, ProductGrid, ReviewForm },
  props:{
    sessionData:Object
  },
  data() {
    return {
      productObject: {},
      qty: 1,
      showAddReviewModal: false,
      showNotLoggedInAlert: false,
      relatedProducts: [],
      valid: false
    };
  },
  methods: {
    lowerBound() {
      let relatedCount = this.relatedProducts.length;
      console.log(relatedCount);
      if (relatedCount < 8) {
        return relatedCount;
      } else {
        return 8;
      }
    }
  },
  created() {
    this.$nextTick(() => {
      axios({
        method: "GET",
        url: this.$hostname + `/products/${this.$route.params.productid}`
      })
        .then(res => {
          console.log('res :', res);
          if (res.status == 200) {
            //console.log("200 recvd");
            this.$set(this.$data, "productObject", res.data);
          } else {
            console.log(`Error: ${res.status} rcvd`);
          }
        })
        .catch(err => {
          console.log("ERROR CAUGHT");
          console.log(err);
        });
      axios({
        method: "GET",
        url: this.$hostname + `/products/relatedProducts`,
        params: {
          array: ["blue", "yellow"]
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
    });
  },
  methods:{
    addToCart(){
      axios({
        method: "PUT",
        url: this.$hostname + "/cart",
        data: {
            item: {
                id: this.productObject._id, 
                name: this.productObject.name, 
                price: this.productObject.Price, 
                image: this.productObject.image,
                qty: this.qty
            },
        }
      }).then(result=>{
          console.log(result)
          this.$emit('update:sessionData', {cart: result.data.cart})
            this.qty = 1

      }).catch(err=>{
          console.log('err :', err);
      })

    },
    handleReviewSubmit(formData){
      var data = new FormData()

      formData.author = {
        id: this.sessionData.userinfo.user_id,
        username: this.sessionData.userinfo.username
      }

      formData.product = {
        id: this.productObject._id,
        name: this.productObject.name
      }

      data.append('formData', JSON.stringify(formData))

      for(var i = 0; i < formData.images.length; i++){
        data.append('images', formData.images[i])
      }

      axios({
        method: "POST",
        url: this.$hostname + '/reviews/' + this.productObject._id,
        data: data,
        headers: {"Content-Type" : "multipart/form-data"}
      }).then(response=>{
        console.log('response', response)
        if(response.status === 200){
          this.showAddReviewModal = false
        }
      }).catch(err=>{
        console.log('err', err)
      })
    },
    toggleReviewModal(){
      if(this.sessionData.loggedIn){
        this.showAddReviewModal = true;
      }
      else{
        this.showNotLoggedInAlert = true;
      }
    }
  }
};
</script>

<style>
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


