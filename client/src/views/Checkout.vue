<template>
    <div>
        <div class="h4">Your items:</div>
        <ItemsTable :items="sessionData.cart" />
        <hr>
        <PriceSummary ref="priceSummary" :items="sessionData.cart" />
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
            taxRate: 0.05 // 5 percent tax on all
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

    },
    methods: {
        selectBilling(idx){
            this.selectedBilling = idx
        },
        submitOrder(){
            axios({
                url: this.$hostname + "/orders",
                method: "POST",
                data: {
                    items: JSON.stringify(this.sessionData.cart),
                    shippingAddress: JSON.stringify(this.addresses[this.selectedShipping]),
                    billingAddress:  JSON.stringify(this.addresses[this.selectedBilling]),
                    tax: this.$refs.priceSummary.taxIncurred,
                    shipping: this.$refs.priceSummary.shippingIncurred,
                /*  seller details now included per item    
                seller:{
                        id: "5cdf4a13da4742097819ab2f",
                        username: "nievesr"
                    },*/
                    customer:{
                        id: this.sessionData.userinfo.user_id,
                        username: this.sessionData.userinfo.username
                    },
                    total: this.$refs.priceSummary.subtotal + this.$refs.priceSummary.taxIncurred + this.$refs.priceSummary.shippingIncurred
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
