<template>
    <div>
        <div class="h4">Your items:</div>
        <ItemsTable :cart="sessionData.cart"/>
        <hr>
        <PriceSummary ref="priceSummary" :cart="sessionData.cart" />
         <div class="h4"> Choose a shipping address</div>
        <b-container fluid>
            <b-row>
                <b-col sm="4" v-for="(address,index) in addresses" :key="index"> 
                    <b-card class="address-card" :class="{'selected-address' : selectedShipping === index? true : false}" @click="selectedShipping = index">
                        <b-container fluid>
                            <b-row>
                                <b-col>
                                    <div class="text-justify"> 
                                        {{address.firstName}} {{address.lastName}}
                                        <br>
                                        {{address.street}}
                                        <br>
                                        {{address.city}}, {{address.state}} {{address.zipcode}}
                                    </div>
                                </b-col>
                            </b-row>
                            
                        </b-container>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

<hr>

<div class="h4">Choose a billing address</div>
        <b-container fluid>
            <b-row>
                <b-col sm="4" v-for="(address,index) in addresses" :key="index"> 
                    <b-card class="address-card" :class="{'selected-address' : selectedBilling === index? true : false}" @click="selectedBilling = index">
                        <b-container fluid>
                            <b-row>
                                <b-col>
                                    <div class="text-justify"> 
                                        {{address.firstName}} {{address.lastName}}
                                        <br>
                                        {{address.street}}
                                        <br>
                                        {{address.city}}, {{address.state}} {{address.zipcode}}
                                    </div>
                                </b-col>
                            </b-row>
                            
                        </b-container>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <b-alert v-model="showInvalidWarning" variant="danger" dismissible> 
            {{warningMessage}}
             </b-alert>


        <b-button @click="submitOrder">
            Place Order (be logged in when you do it tho)
        </b-button>

    </div>
</template>

<script>
import axios from "axios";
import ItemsTable from "../components/ItemsTable"
import PriceSummary from "../components/PriceSummary"
export default {
    props:{
        sessionData: Object
    },
    components:{
        ItemsTable, PriceSummary
    },
    data:()=>{
        return {
            addresses: [],
            selectedBilling: null,
            selectedShipping: null,
            taxRate: 0.05, // 5 percent tax on all
            showInvalidWarning: false,
            warningMessage: null,
        }
    },
    created(){
        // get addresses associated with this user from server...
        axios.get(this.$hostname + "/address/" + this.sessionData.userinfo.user_id)
        .then(response=>{
            console.log(response)
            if(response.status === 200){
                this.addresses = [...response.data]
            }
            else{
            console.log("aww")
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    computed:{
        // TODO hard coded values here
        isOrderValid(){
            if(this.sessionData.cart.length === 0){
                this.warningMessage = "Please add something to your cart!"
                return false
            }

            if(!this.sessionData.loggedIn){
                this.warningMessage = "Please be logged in to perform this action"
                return false
            }

            if(this.selectedBilling === null){
                this.warningMessage ="Please select a billing address"
                return false
            }
            if(this.selectedShipping === null){
                this.warningMessage = "Please select a shipping address"
                return false
            }

            return true
        }

    },
    methods: {
        selectBilling(idx){
            this.selectedBilling = idx
        },
        
        submitOrder(){
            if(!this.isOrderValid){
                this.showInvalidWarning = true
            }

            axios({
                url: this.$hostname + "/orders",
                method: "POST",
                data: {
                    cart: this.sessionData.cart.map((el, idx)=>{
                        return JSON.stringify({
                            ...el,
                            subtotal: this.$refs.priceSummary.subtotalArray[idx],
                            tax: this.$refs.priceSummary.taxArray[idx],
                            shipping: this.$refs.priceSummary.shippingArray[idx],
                            total: this.$refs.priceSummary.subtotalArray[idx] + this.$refs.priceSummary.taxArray[idx] + this.$refs.priceSummary.shippingArray[idx],
                        })
                    }),
                    customerDetails: JSON.stringify({
                        shippingAddress: this.addresses[this.selectedShipping],
                        billingAddress: this.addresses[this.selectedBilling],
                        customer:{
                            id: this.sessionData.userinfo.user_id,
                            username: this.sessionData.userinfo.username
                        }
                    }),
                }
            }).then(response=>{
                if(response.status===200){
                    axios.delete(this.$hostname + '/cart/all').then(response=>{
                        this.$emit('update:sessionData', {cart:response.data})
                        this.$router.push('/')
                    })
                }
                else{
                    console.log(response)
                }
            }).catch(err=>{
                console.log(err)
            })
        },


    }
}
</script>

<style>
.selected-address{
    background: grey;
    color: whitesmoke;
    border: whitesmoke;
}
.address-card:hover{
    background: grey;
    color: whitesmoke;
    border: whitesmoke;
}
</style>
