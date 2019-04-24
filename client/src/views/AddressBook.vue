<template>
    <div>
        <b-card v-for="(address,index) in addresses" :key="index">
            <p>{{ address }}</p>
        </b-card>
    </div>
</template>

<script>
export default {
    data: ()=>{
        return{
            addresses: [ "hi", "hello"]
        }
    },
    mounted: function(){
        // get addresses associated with this user
    },
    methods:{
        handleAddAddress(){

        },
        handleDeleteAddress(){

        },
        handleEditAddress(){

        }
    }
}
</script>
