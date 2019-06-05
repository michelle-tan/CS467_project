<template>
    <div>
        <b-button @click="showAddReviewModal = true">Add review</b-button>
        Here's a product page
       
        <b-modal
            title="Add a review:"
            v-model="showAddReviewModal"
            centered
        >
            <ReviewForm
                :handleSubmit="handleSubmit"
            />
        </b-modal>
<hr>
        <b-button @click="addToCart">Add a product to the cart (and save it, if you're logged in)</b-button>
<hr>
        <b-button @click="getCartFromServer">Retrive cart (if logged in): look in console</b-button>
<hr>
        <b-button @click="deleteReview">Delete the item in the cart</b-button>

    </div>
</template>

<script>
import ReviewForm from '@/components/ReviewForm.vue'
import axios from 'axios'
export default {
    data: ()=>{
        return{
            showAddReviewModal: false,
            productDetails: {},
            qty: 1
        }
    },
    components:{
        ReviewForm
    },
    created: function(){
        axios.get(this.$hostname + "/products/5ceef734b6efbc42bc0a821c")
        .then(result=>{
            if(result.status ===200){
                this.productDetails = result.data
            }
            else{
                console.log("failure");
            }
        }).catch(err=>{
            console.log('err :', err);
        })
    },
    methods:{
        handleSubmit(){
            console.log("submitting")
        },
        addToCart(){
            axios({
                method: "PUT",
                url: this.$hostname + "/cart",
                data: {
                    item: {
                        id: this.productDetails._id, 
                        name: this.productDetails.name, 
                        price: this.productDetails.Price, 
                        image: this.productDetails.image,
                        qty: this.qty
                    },
                }
            }).then(result=>{
                console.log(result)
                this.$emit('update:sessionData', {cart: result.data.cart})
            }).catch(err=>{
                console.log('err :', err);
            })
        },
        getCartFromServer(){
            axios({
                method: "GET",
                url: this.$hostname + "/cart",
            }).then(result=>{
                console.log(result)
            }).catch(err=>{
                console.log('err :', err);
            })
        },
        deleteReview(){
            axios({
                method: "DELETE",
                url: this.$hostname + "/cart",
                data: { id: this.productDetails._id}
            }).then(result=>{
                this.$emit('update:sessionData', {cart: (result.data.cart || [])})
            }).catch(err=>{
                console.log('err :', err);
            })
        }
    }
}
</script>

<style>

</style>
