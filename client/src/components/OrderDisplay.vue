<template>
    <b-container fluid>
       
            <div class="h1 text-left title-text">Order Detail</div>
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
                    <b-table 
                        :items="selectedOrder.items" 
                        :fields="fields"
                    >
                        <template slot="item" slot-scope="data">
                            <b-container >
                                <b-row align-h="start">
                                    <b-col cols="6">
                                        <b-img class="product-thumbnail" :src="data.item.img" />
                                    </b-col>
                                    <b-col cols="6" style="padding: 0">
                                        <div class="text-left">
                                            <strong> {{data.item.title}} </strong>
                                            <br>
                                            <div class="text-muted"> {{data.item.color}}</div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="6" offset="6">
                    <div style="margin-bottom:15px">
                        <strong> Order Total: ${{ selectedOrder.total.toFixed(2) }}</strong>
                    </div>
                </b-col>
            </b-row>
       
    </b-container>
</template>

<script>
export default {
    props:{
        orders: Array
    },
    data: ()=>{
        return{
            selectedOrder: {},
            fields:[
                {
                    key:'item',
                    label:'Item',
                    class: 'item-col'
                },
                {
                    key:'unitPrice',
                    label:'Price',
                    formatter: (value)=>{
                        return '$' + value
                    }
                },
                {
                    key:'qty',
                    label: 'Qty'
                },
                {
                    key:'subtotal',
                    label:'Subtotal',
                    formatter: (value, key, item)=>{
                        return '$' + (item.qty * item.unitPrice).toFixed(2)
                    }
                },
            ]
        }
    }
    ,
    created: function(){
        // just for readability
        this.selectedOrder = this.orders[this.$route.params.id]
    }
}
</script>

<style>
.title-text{
    margin-top:20px;
    margin-left: 15px;
}
.product-thumbnail{
    width: 100%;
    height: auto;
}
.item-col{
    width:40%;
}
.order-info-card{
    margin: 10px
}

</style>
