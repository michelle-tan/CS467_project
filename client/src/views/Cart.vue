<template>
    <b-container fluid>
        <div class="h2 text-left title-text">Your Cart:</div>
        <b-alert variant="danger" :show="sessionData.loggedIn===false">Please be logged in to make orders!</b-alert>
        <b-row>
            <b-col cols="12" md="9">
                <ItemsTable dynamic v-if="sessionData.cart.length > 0 " :cart="sessionData.cart" />
                <div v-else class="h4">
                    <hr>
                    Your cart is empty!</div>
                <hr>
               
            </b-col>

       
            <b-col md="3">
                <b-card>
                <PriceSummary :cart="sessionData.cart" />
                <b-button to="/checkout"  style="width:100%" :disabled="sessionData.cart.length===0 || sessionData.loggedIn===false">Checkout</b-button>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ItemsTable from "@/components/ItemsTable.vue"
import PriceSummary from "@/components/PriceSummary.vue"

export default {
    components:{
        ItemsTable,
        PriceSummary
    },
    props:{
        sessionData: Object
    },
    data:()=>{
        return{
            
            
            
        }
    },
    computed:{
        

    }
}
</script>

<style>
.title-text{
    margin-top:20px;
    margin-left: 15px;
}
</style>
