<!-- 
    NOTES : 

        * Button is disabled as long as...
            the paswords don't match, 
            the zipcode is not exactly 5 numbers, 
            and the form does not pass HTML5 validation

        * HTML5 form validation is present, but supplemented by computed methods
            * USERNAME: must not be blank: uses HTML5 validation
            * PASSWORDS: must match
                only barks when formData.passwordRepeat is equal to or greater than formData.password in length
            * EMAIL: must follow email format: uses HTML5 validation 
            * ZIPCODE: must be exactly 5 numbers long

        TODO:    
            * STATE: make into a select with autocomplete

        * This component emits a "logged-in" event when registration is successful

-->

<template>
    <b-form ref="form" @submit.prevent="handleSubmit">
        <b-alert variant="danger" dismissible :show="showFailure">Something's gone awry, please try again later!</b-alert>

        <div v-for="(input, key) in formData" :key="key">
                <b-form-group :label="key|wordify|capitalize|colonize" 
                    >
                    <b-form-input
                        :type="key|inputType"
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
                v-model="passwordRepeat"
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

        <b-card bg-variant="light">
            <b-form-group label="Register as Seller or Customer?">
                <b-form-radio-group id="isSellerRadio" v-model="isSeller" name="isSeller">
                    <b-form-radio :value="false">Customer</b-form-radio>
                    <b-form-radio :value="true">Seller</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </b-card>
        <b-button type="submit" variant="primary" :disabled="!validateForm">Submit</b-button>
    </b-form>
</template>

<script>
import axios from 'axios'
export default {
    props:{
    },

    data: ()=>{
        return{
        formData: {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            
            // any fields not provided are created when the user begins typing in the field
        },
        isSeller: false,
        passwordRepeat: '',
       isMounted: false,
       profile_image: null,
       user:{}, 
       showFailure: false
        }
    },

    mounted: function(){
        this.isMounted = true
        // assigns the form its data if passed as props
        if(this.userData){
            Object.assign(this.formData, this.userData)
        }
    },

    computed: {
 //       validateUsername(){
            // insert call to check if username is taken?
 //       },

        validatePassword(){
            if( this.formData.password &&
                this.passwordRepeat.length >= this.formData.password.length &&
                this.formData.password !== this.passwordRepeat){
                return { isValid: false, message: "Passwords do not match" }
            }

            else if (this.formData.password &&
            this.formData.password === this.passwordRepeat){
                return { isValid: true, message: "Passwords match!" }
            }

            return {isValid: false, message: ""}   
        },

        validateForm(){
            if(this.isMounted){
                return (   
                    this.validatePassword.isValid && 
                    this.$refs.form.checkValidity()
                )
            }
            else{
                return false
            }
        }
    },
    methods:{
        handleSubmit(){
           var submitObject = new FormData()
            submitObject.append('formData', JSON.stringify({...this.formData, isSeller: this.isSeller}))
            submitObject.append('image', this.profile_image)

           // collect the fields to update on server in submitObject
           /*for(var field in this.formData){
               if(this.formData[field] && this.formData[field] !== this.sessionData.userinfo[field]){
                   submitObject[field] = this.formData[field]
               }
           }*/

           axios({
                    method: 'post',
                    url: this.$hostname + '/register',
                    headers: {"content-Type" : "multipart/form-data"},
                    data: submitObject
                }).then(response=>{
                    if(response.status===200){
                        this.$emit("logged-in", {userinfo:{...response.data}, loggedIn: true})
                    }else{
                         this.showFailure = true;
                        console.log(response)
                    }
                }).catch(err=>{
                    this.showFailure = true;
                    console.log(err)
                })
           console.log(submitObject)
           this.showModal = false
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
}
</script>