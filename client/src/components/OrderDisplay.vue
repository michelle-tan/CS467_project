<template>
<div>
    <b-container fluid>
        <div class="h1 text-left title-text">Order Detail</div>
            <hr>
            <b-row>
                <b-col sm="6">
                    <b-card class="order-info-card">
                        <div class="text-justify"> 
                            <strong>Date Ordered :</strong>
                            {{ selectedOrder.dateOrdered | formatDate }}
                        </div>
                        <div class="text-justify">
                            <strong> Status: </strong> 
                            <span v-if="selectedOrder.isShipped"> Shipped on {{ selectedOrder.dateShipped }} </span>
                            <span v-else>Awaiting fulfillment</span>
                        </div>
                        <div class="text-justify"> 
                            <strong> Tracking #: </strong>
                            <span v-if="selectedOrder.trackingNumber">
                                {{ selectedOrder.trackingNumber }}
                            </span>
                            <span v-else> No tracking available </span>
                        </div>
                    </b-card>
                    <b-card class="order-info-card">
                        <div class="text-justify"> 
                            <strong> Shipped To: </strong>
                            <br>
                            {{selectedOrder.shippingAddress.firstName}} {{selectedOrder.shippingAddress.lastName}}
                            <br>
                            {{selectedOrder.shippingAddress.street}}
                            <br>
                            {{selectedOrder.shippingAddress.city}}, {{selectedOrder.shippingAddress.state}} {{selectedOrder.shippingAddress.zipcode}}
                        </div>
                    </b-card>
                </b-col>
                <b-col sm="6" align-self="end">
                    <b-card class="order-info-card">
                        <div class="text-justify"> 
                            <strong> Billed To: </strong>
                            <br>
                            {{selectedOrder.billingAddress.firstName}} {{selectedOrder.billingAddress.lastName}}
                            <br>
                            {{selectedOrder.billingAddress.street}}
                            <br>
                            {{selectedOrder.billingAddress.city}}, {{selectedOrder.billingAddress.state}} {{selectedOrder.billingAddress.zipcode}}
                        </div>
                    </b-card>
                </b-col>
            </b-row>
            <b-row align-h="center">
                <b-col sm="11">
                    <ItemsTable :cart="[selectedOrder]" />
                </b-col>
            </b-row>
    </b-container>
    <hr>
    <PriceSummary :cart="[selectedOrder]" />
    </div>
</template>

<script>
import ItemsTable from "./ItemsTable.vue"
import PriceSummary from "./PriceSummary.vue"

export default {
    components:{
        ItemsTable,
        PriceSummary
    },
    props:{
        orders: Array // orders to contain objects that each describe an order...
    },
    data: ()=>{
        return{
       //     selectedOrder: {}, // a copy of the single order that the user wants to see deets for

        }
    }
    ,
  
    computed:{
        selectedOrder(){
            return this.orders[this.$route.params.id]
        }
    },
    filters:{
        formatDate(date){
            var date = new Date(date)
            return date.toLocaleDateString("en-US")
        }
    }
}
</script>

<style>
.title-text{
    margin-top:20px;
    margin-left: 15px;
}

.order-info-card{
    margin: 10px
}

</style>
