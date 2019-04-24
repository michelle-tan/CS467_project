<template>
    <div>
        <router-view :orders="orders" />
    </div>
</template>

<script>
export default {
    data: ()=>{
        return{
            orders: [ 
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
                }
            ]
        }
    },
    mounted: function(){
        // get orders associated with this user
    },
    methods:{
    },
}
</script>

