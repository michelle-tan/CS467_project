<template>
    <b-container fluid>
        <div class="h2 text-left title-text">Your Cart:</div>
        <b-row>
            <b-col>
                <ItemsTable :items="sessionData.cart" />
                <hr>
            </b-col>
        </b-row>
        
        <b-row>
            <b-col>
                <PriceSummary :items="sessionData.cart" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ItemsTable from "@/components/ItemsTable.vue"
import PriceSummary from "@/components/PriceSummary.vue"

export default {
    components:{
        ItemsTable,
        PriceSummary
    },
    props:{
        sessionData: Object
    },
    data:()=>{
        return{
            
            
            
        }
    },
    computed:{
        

    }
}
</script>

<style>
.title-text{
    margin-top:20px;
    margin-left: 15px;
}
</style>
