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
                            {{ selectedOrder.dateCreated }}
                        </div>
                        <div class="text-justify">
                            <strong> Status: </strong> 
                            <span v-if="selectedOrder.isShipped"> Shipped on {{ selectedOrder.dateShipped }} </span>
                            <span v-else>Status: Awaiting fulfillment</span>
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
                            {{selectedOrder.address.firstName}} {{selectedOrder.address.lastName}}
                            <br>
                            {{selectedOrder.address.street}}
                            <br>
                            {{selectedOrder.address.city}}, {{selectedOrder.address.state}} {{selectedOrder.address.zipcode}}
                        </div>
                    </b-card>
                </b-col>
                <b-col sm="6" align-self="end">
                    <b-card class="order-info-card">
                        <div class="text-justify"> 
                            <strong> Billed To: </strong>
                            <br>
                            {{selectedOrder.address.firstName}} {{selectedOrder.address.lastName}}
                            <br>
                            {{selectedOrder.address.street}}
                            <br>
                            {{selectedOrder.address.city}}, {{selectedOrder.address.state}} {{selectedOrder.address.zipcode}}
                        </div>
                    </b-card>
                </b-col>
            </b-row>
            <b-row align-h="center">
                <b-col sm="11">
                    <ItemsTable :items="selectedOrder.items" />
                </b-col>
            </b-row>
    </b-container>
    <hr>
    <PriceSummary :items="selectedOrder.items" />
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
            selectedOrder: {}, // a copy of the single order that the user wants to see deets for

        }
    }
    ,
    created: function(){
        // just for readability, alias the order they want to see as the selectedOrder
        this.selectedOrder = this.orders[this.$route.params.id]
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
