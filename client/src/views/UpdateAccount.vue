<template>
    <b-container fluid>
        <div class="h2 text-left title-text">Update your information:</div>
        <hr>

        <b-row align-h="center">
            <b-col md="8">
                <b-card>
                    <b-alert variant="danger" :show="showFailure">{{ failureMessage }}</b-alert>
                <b-form>

                    <div v-for="(input, key) in formData" :key="key">
                            <b-form-group :label="key|wordify|capitalize|colonize" 
                                >
                                <b-form-input
                                    :type="key|inputType"
                                    :placeholder="input"
                                    v-model="formData[key]"
                                >
                                </b-form-input>
                            </b-form-group>
                    </div>

                    <b-form-group 
                        v-if="formData.password" 
                        label="Re-type password:" 
                    >
                        <b-form-input
                            type="password"
                            required
                            v-model="repeatPassword"
                        />
                    </b-form-group>

                    <b-form-group label="Profile Image:">
                        <b-form-file
                            v-model="profile_image"
                            placeholder="Upload profile image..."
                            drop-placeholder="Drop file here..."
                            accept="image/*"             
                        >
                        </b-form-file>
                    </b-form-group>

                    <b-button  type="button" @click="validateFormToShowModal">Update</b-button>  
                    <b-modal
                        v-model="showModal"
                        centered
                        title= "Please provide your current password to proceed"
                        @ok.prevent="handlePasswordCheck"
                        >
                        <b-card>
                            <b-alert variant="danger" :show="showFailure">{{ failureMessage }}</b-alert>

                            <b-form-group 
                            label="Current Password" 
                            >
                                <b-form-input
                                    type="password"
                                    required
                                     v-model="currentPassword"
                                />    
                            </b-form-group>
                        </b-card>
                    </b-modal>              
                </b-form>
               </b-card>
            </b-col>
        </b-row>
        
        <b-row >
            <b-col>
                 
            </b-col>
        </b-row>
        
    </b-container>
</template>

<script>
import axios from 'axios'

export default {
    props:{
        sessionData: Object
    },
    data: ()=>{
        return{
            formData: {
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                password: '',
            },
            profile_image:null,
            showModal: false,
            repeatPassword: null,
            currentPassword: null,
            showFailure: false,
            failureMessage: ''
        }
    },
    created: function(){
        this.formData.username = this.sessionData.userinfo.username
        this.formData.email = this.sessionData.userinfo.email
        this.formData.firstName = this.sessionData.userinfo.firstName
        this.formData.lastName = this.sessionData.userinfo.lastName
    },
    methods:{
        
        handlePasswordCheck(){
            if(!this.currentPassword){
                this.failureMessage = "You must provide your current password to proceed..."
                this.showFailure = true
                return
            }
            axios({
                    method: 'post',
                    url: this.$hostname+ '/login',
                    data: { username: this.sessionData.userinfo.username, password: this.currentPassword }
                }).then(response=>{
                    if(response.status===200){
                        this.handleSubmit()
                    }else{
                        console.log(response)
                        this.failureMessage = "Could not verify current password"
                        this.showFailure = true
                    }
                }).catch(err=>{
                    this.failureMessage = "Something's gone awry, please try again later!"
                    this.showFailure = true;
                    console.log(err)
                })
        },
        handleSubmit(){
           var submitObject = new FormData()
            submitObject.append('formData', JSON.stringify(this.formData))
            submitObject.append('image', this.profile_image)
            submitObject.append('username', this.sessionData.userinfo.username)

           // collect the fields to update on server in submitObject
           /*for(var field in this.formData){
               if(this.formData[field] && this.formData[field] !== this.sessionData.userinfo[field]){
                   submitObject[field] = this.formData[field]
               }
           }*/

           axios({
                    method: 'post',
                    url: this.$hostname + '/update',
                    headers: {"content-Type" : "multipart/form-data"},
                    data: submitObject
                }).then(response=>{
                    if(response.status===200){
                        this.$emit("update:sessionData", response.data)
                    }else{
                        console.log(response)
                        this.failureMessage = "Could not update account info"
                        this.showFailure = true
                    }
                }).catch(err=>{
                    this.failureMessage = "Something's gone awry, please try again later!"
                    this.showFailure = true;
                    console.log(err)
                })
           console.log(submitObject)
           this.showModal = false
        },
        validateFormToShowModal(){
            if(this.formData.password && this.formData.password !== this.repeatPassword){
                this.failureMessage = "Please re-type your new password (it may not match)" 
                this.showFailure = true  
            }
            else{
                this.showFailure = false
                this.showModal = true
            }
        },

    },
    filters:{
        capitalize(value){
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        colonize(value){

            return value + ":"
        },
        wordify(value){
           
            var startOfLastWord = 0
            var returnValue = ''
            for(var i = 0 ; i < value.length; i++){
                
                if(value[i] === "_" || value[i] === "-"){
                    returnValue += value.substring(startOfLastWord, i)
                    returnValue += " "
                    i++;
                    startOfLastWord = i
                }
                else if(value[i] == value.charAt(i).toUpperCase()){
                    
                    // substring name up to this capital
                    returnValue += value.substring(startOfLastWord, i)
                    returnValue += " "
                    //update word start for next substring call
                    startOfLastWord = i
                }
                
            }
            returnValue += value.substring(startOfLastWord)
            return returnValue
        },
        inputType(value){
            if(value === "password"){
                return "password"
            }
            else{
                return "text"
            }
        }
    },
    computed:{
        isPasswordProvided(){
            if(!this.formData.currentPassword){
                return false
            }
            else{
                return true
            }
        },
        
    }
}
</script>

<style>
.update-form{
    margin: 10px;
}
</style>


