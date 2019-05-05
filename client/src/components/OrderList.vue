<template>
    <div>
        <div class="h1 text-left title-text">Order History</div>
        <hr>
        <b-table 
            :items="orders" 
            :fields="fields" 
            hover 
            striped
            @row-clicked="displayOrder"
        >
            <template slot="status" slot-scope="data">
                <div v-if="data.item.isShipped">Order was shipped on {{ data.item.dateShipped }}</div>
                <div v-else>Awaiting fulfillment</div>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    props:{
        orders: Array
    },
    data: ()=>{
        return{
            fields: [
                {
                    key: "dateCreated",
                    label: "Order Date",
                },
                {
                    key: "id",
                    label: "Order Number"
                },
                {
                    key: "status",
                    label: "Order Status",
                },
                {
                    key: "total",
                    label: "Order Total",
                    formatter: (value)=>{
                        return "$"+ value.toFixed(2)
                    }
                }
            
            ],
        }
    },

    methods:{
        formatOrderStatus(order){
            console.log(order)
            if(order.isShipped){
                return "Shipped"
            }
            else{
                return "WIP"
            }
        },
        displayOrder(record , index){
            // NB: using index, NOT id as route param
            this.$router.push(this.$route.path + '/' + (index))
        },
    }
}
</script>

<style>
.title-text{
    margin-top:20px;
    margin-left: 15px;
}
</style>


