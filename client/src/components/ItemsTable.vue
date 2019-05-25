<!-- displays an array of item objects as a table (used by OrderDisplay.vue and Cart.vue-->

<template>
    <b-table 
        :items="items" 
        :fields="fields"
    >
        <template slot="item" slot-scope="data">
            <b-container >
                <b-row align-h="start">
                    <b-col cols="6">
                        <b-img class="product-thumbnail" :src="data.item.image" />
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
    </b-table>
</template>

<script>
export default {
    props:{
        items: Array
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
                    key:'unitPrice',
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
                        return '$ ' + (item.qty * item.unitPrice).toFixed(2)
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
