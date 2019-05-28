<template>
    <div>
        <b-button @click="submitOrder">
            Place Order (be logged in when you do it tho)
        </b-button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props:{
        sessionData: Object
    },
    computed:{
        // TODO hard coded values here
        total(){
            var total = 0;
            for(var i = 0 ; i < this.sessionData.cart.length; i++){
                total += this.sessionData.cart[i].qty * this.sessionData.cart[i].unitPrice
            }
            return total + 1 + 2;
        }
    },
    methods: {
        submitOrder(){
            axios({
                url: this.$hostname + "/orders",
                method: "POST",
                data: {
                    items: JSON.stringify(this.sessionData.cart),
                    shippingAddress: JSON.stringify({
                        firstName: this.sessionData.userinfo.firstName,
                        lastName: this.sessionData.userinfo.lastName,
                        street: this.sessionData.userinfo.address.street,
                        city: this.sessionData.userinfo.address.city,
                        state: this.sessionData.userinfo.address.state,
                        zipcode: this.sessionData.userinfo.address.zipcode
                    }),
                    billingAddress:  JSON.stringify({
                        firstName: this.sessionData.userinfo.firstName,
                        lastName: this.sessionData.userinfo.lastName,
                        street: this.sessionData.userinfo.address.street,
                        city: this.sessionData.userinfo.address.city,
                        state: this.sessionData.userinfo.address.state,
                        zipcode: this.sessionData.userinfo.address.zipcode
                    }),
                    tax: 1,
                    shipping: 2,
                    seller:{
                        id: "5cdf4a13da4742097819ab2f",
                        username: "nievesr"
                    },
                    customer:{
                        id: this.sessionData.userinfo.user_id,
                        username: this.sessionData.userinfo.username
                    },
                    total: this.total
                }
            }).then(response=>{
                if(response.status===200){
                    console.log(response)
                }
                else{
                    console.log(response)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
