<template>
    <div>
        <!-- in router.js, OrderHistory is a page that has two children - 
            /account/orders/ renders component OrderList.vue into router-view
            and /account/orders/:id renders component OrderDisplay into router-view 
            both require props, and they receive the orders object...it contains all the order info-->
            
        <router-view :orders="orders" :sessionData="sessionData" @update:orders="updateOrders"/>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        sessionData: Object
    },
    data: ()=>{
        return{
            orders: []
        }
    },
    created(){
        var url
            if(this.sessionData.userinfo.isSeller){
                url = this.$hostname+"/orders/bySeller/" + this.sessionData.userinfo.user_id
            }
            else{
                url = this.$hostname+"/orders/byCustomer/" + this.sessionData.userinfo.user_id
            }
            axios.get(url).then(response=>{
                if(response.status === 200){
                    console.log(response)
                    this.orders = response.data
                }
                else{
                    console.log(response)
                }
            }).catch(err=>{
                console.log(err)
            })
        
    },
    methods:{
        updateOrders(payload){
            console.log('payload', payload)
            var idx = this.orders.findIndex((el)=>{
                return el.id === payload.id
            })
            this.orders[idx] = payload
        }
    },
}
</script>

