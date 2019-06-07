<!-- displays an array of item objects as a table (used by OrderDisplay.vue and Cart.vue-->

<template>
    <div>
        <div v-for="store in cart" :key="store.seller_id">
            <div v-if="store.storeInfo" class="h4">Items from: {{store.storeInfo.storeName}} </div>
            <b-table 
                :items="store.items" 
                :fields="fields"
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
                                    <br>
                                    <div class="text-muted"> Color: 
                                        <span v-if="data.item.color">{{data.item.color}}</span> 
                                        <span v-else>N/A</span>
                                    </div>
                                    <div class="text-muted"> Size:
                                        <span v-if="data.item.size">{{data.item.size}}</span> 
                                        <span v-else>N/A</span>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-container>
                </template>
                <template slot="qty" slot-scope="data">
                    <div v-if="dynamic">
                        
                         <b-input-group class="mt-3">
                            
                                <b-input-group-text slot="prepend">
                                    <font-awesome-icon icon="minus" @click="data.item.qty--"/>
                                </b-input-group-text>
                            <b-col cols="3" style="padding:0px">
                                <b-form-input v-model="data.item.qty"></b-form-input>
                            </b-col>
                            <b-input-group-text slot="append">
                                <font-awesome-icon icon="plus" @click="data.item.qty++"/>
                            </b-input-group-text>
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
                        return '$ ' + value
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
                        return '$ ' + (item.qty * item.price).toFixed(2)
                    }
                },
            ]
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
</style>
