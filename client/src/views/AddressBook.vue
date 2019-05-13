<template>
    <div>
        <div class="h2 text-left title-text">Your Saved Addresses:</div>
        <hr>
        <b-container>
            <b-row align-h="center" align-v="center">
                <b-col cols="6" md="5" lg="3">
                    <b-button  class="add-button" @click="handleAddAddress">
                        <font-awesome-icon icon="plus"/>
                        Add New Address
                    </b-button>
                </b-col>
               
            </b-row>
        </b-container>
        <b-container fluid>
            <b-row>
                <b-col sm="4" v-for="(address,index) in addresses" :key="index"> 
                    <b-card class="address-card">
                        <b-container fluid>
                            <b-row>
                                <b-col>
                                    <div class="text-justify"> 
                                        {{address.firstName}} {{address.lastName}}
                                        <br>
                                        {{address.street}}
                                        <br>
                                        {{address.city}}, {{address.state}} {{address.zipcode}}
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row >
                                <b-col>
                                    <div class="text-right">
                                        <font-awesome-icon class="icon" @click="handleEditAddress" icon="pencil-alt" />
                                        <font-awesome-icon class="icon"  @click="handleDeleteAddress" icon="trash-alt" />
                                    </div>
                                  </b-col>
                                
                            </b-row>
                        </b-container>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data: ()=>{
        return{
            addresses:[]
        }
    },
    created: function(){
        // get addresses associated with this user from server...
        this.addresses.push({
            firstName: "borb",
            lastName: "zorp",
            street: "123 hi world",
            city: "citee",
            state: "ST",
            zipcode: 12345
        })
         this.addresses.push({
            firstName: "lorb",
            lastName: "zorp",
            street: "123 hi world",
            city: "citee",
            state: "ST",
            zipcode: 12345
        })
        this.addresses.push({
            firstName: "borb",
            lastName: "zorp",
            street: "123 hi world",
            city: "citee",
            state: "ST",
            zipcode: 12345
        })
        this.addresses.push({
            firstName: "borb",
            lastName: "zorp",
            street: "123 hi world",
            city: "citee",
            state: "ST",
            zipcode: 12345
        })
    },
    methods:{
        handleAddAddress(){
            console.log('add')
        },
        handleDeleteAddress(){
            console.log('delete')
        },
        handleEditAddress(){
            console.log('edit')
        }
    }
}
</script>

<style>
.address-card{
    margin-top: 5px;
    margin-bottom: 5px;
}
.title-text{
    margin-top:20px;
    margin-left: 15px;
}
.icon{
   margin: 10px
}
.icon:hover{
    color: grey
}
.add-button{
    width: 100%;
    margin-bottom: 10px;
}

</style>


