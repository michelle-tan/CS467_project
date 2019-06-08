<!-- displays an array of item objects as a table (used by OrderDisplay.vue and Cart.vue-->

<template>
    <div>
        <div v-for="store in cart" :key="store.seller_id">
            <div v-if="store.storeInfo" class="h5 title-text">Items from: {{store.storeInfo.storeName}} </div>
            <b-table 
                :items="store.items" 
                :fields="fields"
                fixed
                responsive
            >
                <template slot="item" slot-scope="data">
                    <b-container >
                        <b-row align-h="start">
                            <b-col cols="6">
                                <a :href="'/products/item/' + data.item.id">
                                    <b-img class="product-thumbnail" :src="data.item.image" />
                                </a>
                            </b-col>
                            <b-col cols="6" style="padding: 0">
                                <div class="text-left">
                                    <strong> {{data.item.name}} </strong>
                                    <!--br>
                                    <div class="text-muted"> Color: 
                                        <span v-if="data.item.color">{{data.item.color}}</span> 
                                        <span v-else>N/A</span>
                                    </div>
                                    <div class="text-muted"> Size:
                                        <span v-if="data.item.size">{{data.item.size}}</span> 
                                        <span v-else>N/A</span>
                                    </div-->
                                </div>
                            </b-col>
                        </b-row>
                    </b-container>
                </template>
                <template slot="qty" slot-scope="data">
                    <div v-if="dynamic">
                        
                         <b-input-group class="mt-3" style="padding:0px; margin:0px">
                            
                                <b-input-group-prepend class="hideOnSmallScreen">
                                    <b-button size="sm" @click="data.item.qty--; updateCart(data.item.qty, data.item.id)">
                                        <font-awesome-icon size="xs" icon="minus"/>
                                    </b-button>
                                </b-input-group-prepend>
                                <b-form-input class="dynamicInput" v-model="data.item.qty"></b-form-input>
                            <b-input-group-append class="hideOnSmallScreen">
                                    <b-button size="sm" @click="data.item.qty++; updateCart(data.item.qty, data.item.id)">
                                        <font-awesome-icon size="xs" icon="plus"/>
                                    </b-button>
                                </b-input-group-append>
                        </b-input-group>

                    </div>

                    <div v-else>
                        {{data.item.qty}}
                    </div>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props:{
        cart: Array,
        dynamic: Boolean
    },
   
    data:()=>{
        return{
           
            fields:[
                {
                    key:'item',
                    label:'Item',
                    class: 'item-col'
                },
                {
                    key:'price',
                    label:'Price',
                    formatter: (value)=>{
                        return (value.toFixed(2))
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
                        return  (item.qty * item.price).toFixed(2)
                    }
                },
            ]
        }
    },
    methods:{
        updateCart(qty, item_id){
            // if you remove the last instance of an item, the item should be deleted from the cart
            var storeIndex, itemIndex
            if(qty < 1){
                storeIndex = this.cart.findIndex((store)=>{
                    itemIndex = store.items.findIndex((item)=>{
                        return item.id === item_id
                    })
                    return itemIndex !== -1
                })
                this.cart[storeIndex].items.splice(itemIndex, 1)
                console.log('this.cart[storeIndex].items :', this.cart[storeIndex].items);
                if(this.cart[storeIndex].items.length ===0){
                    this.cart.splice(storeIndex,1)
                    console.log('this.cart', this.cart)
                }
            }    
           
            axios({
                method: "PUT",
                url: this.$hostname + "/cart",
                data: {cart:JSON.stringify(this.cart)}
            }).then(response=>{
  //              this.$emit("update:sessionData", {cart: response.data})
            }).catch(err=>{
                console.log('err', err)
            })

        }
    }
}
</script>

<style>
.product-thumbnail{
    width: 100%;
    height: auto;
}
.item-col{
    width:40%;
}

.title-text{
    margin-top:20px;
    margin-left: 15px;
}
@media only screen and (max-width: 600px){
.hideOnSmallScreen{
    visibility: hidden;
}
.dynamicInput{
    position:fixed;
    top: -50px
}
}
</style>
