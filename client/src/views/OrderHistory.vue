<template>
    <div>
        <!-- in router.js, OrderHistory is a page that has two children - 
            /account/orders/ renders component OrderList.vue into router-view
            and /account/orders/:id renders component OrderDisplay into router-view 
            both require props, and they receive the orders object...it contains all the order info-->
            
        <router-view :orders="orders" />
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
            orders: [ /*
                {
                    id: 1,
                    total: 30.00,
                    dateCreated: "Jan 1, 2019",
                    dateShipped: "Jan 6, 2019",
                    isShipped: true, // or a tracking number, if available?
                    isReviewed: false, //  or a link to the review?
                    address: {
                        firstName: "zoop",
                        lastName: "boop",
                        street: "123 hello world",
                        city: "City",
                        state: "state",
                        zipcode: 12345
                    },
                    items:[
                        {
                            id: 1,
                            title: "cat",
                            color: "brown",
                            qty: 3,
                            unitPrice: 10,
                            img: "https://www.catster.com/wp-content/uploads/2018/09/Brown-tabby-cat-with-M-on-forehead.jpg"
                        },
                        {
                            id: 1,
                            title: "cat",
                            color: "brown",
                            qty: 3,
                            unitPrice: 10,
                            img: "https://www.catster.com/wp-content/uploads/2018/09/Brown-tabby-cat-with-M-on-forehead.jpg"
                        }
                    ]        
                }*/
            ]
        }
    },
    created: function(){
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
    },
}
</script>

