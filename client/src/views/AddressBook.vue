<template>
    <div>
        <div class="h2 text-left title-text">Your Saved Addresses:</div>
        <hr>
        <b-container>
            <b-row align-h="center" align-v="center">
                <b-col cols="6" md="5" lg="3">
                    <b-button  class="add-button" @click="showFormModal = true; modalTitle = 'Add new address'; selectNewAddress(null)">
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
                                        <font-awesome-icon class="icon" @click="showFormModal = true; modalTitle = 'Edit address'; selectNewAddress(index);" icon="pencil-alt" />
                                        <font-awesome-icon class="icon"  @click="handleDeleteAddress(index)" icon="trash-alt" />
                                    </div>
                                  </b-col>
                                
                            </b-row>
                        </b-container>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <b-modal
            v-model="showFormModal"
            centered
            :title="modalTitle"
            @ok="submitFunction"
        >
            <b-form>
            <b-form-group label="Name:">
            <b-container>
                <b-form-row>
                    <b-col>
                        <b-form-input
                            type="text"
                            required
                            placeholder="First Name"
                            v-model="formData.firstName"
                        />
                    </b-col>
                    <b-col>
                        <b-form-input
                            type="text"
                            required
                            placeholder="Last Name"
                            v-model="formData.lastName"
                        />
                    </b-col>
                </b-form-row>
            </b-container>
        </b-form-group>
        <b-form-group label="Address:">
            <b-container>

                <b-form-row>
                    <b-col>
                        <b-form-input
                            type="text"
                            required
                            placeholder="Street Name"
                            v-model="formData.street"
                        >
                        </b-form-input>
                    </b-col>
                </b-form-row>

                <b-form-row>
                    <b-col>
                        <b-form-input
                            type="text"
                            required
                            placeholder="City"
                            v-model="formData.city"
                        >
                        </b-form-input>
                    </b-col>
                </b-form-row>

                <b-form-row>
                    <b-col>
                        <b-form-input
                            type="text"
                            required
                            placeholder="State"
                            v-model="formData.state"
                        >
                        </b-form-input>
                    </b-col>             
                    <b-col>
                        <b-form-input
                            type="number"
                            required
                            placeholder="Zip Code"
                            v-model="formData.zipcode"                        >
                        </b-form-input>
                    </b-col>
                </b-form-row>
                
            </b-container>
        </b-form-group>
                
            </b-form>
        </b-modal>
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
            addresses:[],
            showFormModal: false,
            modalTitle: "Add new address",
       //     selectedAddressIndex: null,
            isEditMode: false,
            formData : {
                firstName: '',
                lastName: '',
                street: '',
                city: '',
                state:'',
                zipcode : null
            },
        }
    },
    created: function(){
        // get addresses associated with this user from server...
        axios.get(this.$hostname + "/address/" + this.sessionData.userinfo.user_id)
        .then(response=>{
            console.log(response)
            if(response.status === 200){
                this.addresses = [...response.data]
            }
            else{
            console.log("aww")
            }
        }).catch(err=>{
            console.log(err)
        })

    },
    methods:{
        handleAddAddress(){
            console.log('add')
            axios({
                method: "POST",
                url: this.$hostname + "/address",
                data: {user_id: this.sessionData.userinfo.user_id, address: this.formData}
            }).then(result=>{
                if(result.status===200){
                    console.log("success");
                }
                else{
                    console.log("failure");
                }
            }).catch(err=>{
                console.log('err :', err);
            })
        },
        handleDeleteAddress(index){
            axios({
                method: "DELETE",
                url: this.$hostname + "/address/" + this.addresses[index]._id,
                data: {user_id: this.sessionData.userinfo.user_id}
            }).then(result=>{
                if(result.status===200){
                    console.log("success");
                }
                else{
                    console.log("failure");
                }
            }).catch(err=>{
                console.log('err :', err);
            })

        },
        handleEditAddress(){
            axios({
                method: "PUT",
                url: this.$hostname + "/address/" + this.formData._id,
                data: {user_id: this.sessionData.userinfo.user_id, address: this.formData}
            }).then(result=>{
                if(result.status===200){
                    console.log("success");
                }
                else{
                    console.log("failure");
                }
            }).catch(err=>{
                console.log('err :', err);
            })

        },
        selectNewAddress(index){
            if(index === null){
                this.isEditMode = false
                this.formData = {}
                return
            }
            this.isEditMode = true
            this.formData = {...this.addresses[index]}
        }
        
    },
    computed:{
            firstNameValue(){
                if(this.selectedAddressIndex == null){
                    return "First Name"
                }
                    return this.addresses[this.selectedAddressIndex].firstName || this.sessionData.userinfo.firstName
            },
            submitFunction(){
                if(this.isEditMode == false){
                    return this.handleAddAddress
                }
                return this.handleEditAddress
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


