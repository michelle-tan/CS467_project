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
        <b-form-group label="Username:"
      >
            <b-form-input
                type="text"
                required
                placeholder="Choose a unique username"
                v-model="formData.username"

            >
            </b-form-input>
        </b-form-group>
        <b-form-group label="Email:"
        >
            <b-form-input
                type="email"
                ref="emailInput"
                required
                placeholder="Enter your email"
                v-model="formData.email"
                
            >
            </b-form-input>
        </b-form-group>
        <b-form-group 
        label="Password:"
        :state="validatePassword.isValid"
        :invalid-feedback="validatePassword.message"
        :valid-feedback="validatePassword.message"
        >
            <b-form-input
                type="password"
                required
                placeholder="Choose a strong password"
                v-model="formData.password"
            >
            </b-form-input>
            <b-form-input
                type="password"
                required
                placeholder="Confirm your password"
                v-model="formData.passwordRepeat"
            >
            </b-form-input>
        </b-form-group>
        <b-card bg-variant="light">
            <b-form-group label="Register as Seller or Customer?">
                <b-form-radio-group id="isCustomerRadio" v-model="formData.isCustomer" name="isCustomer">
                    <b-form-radio value="true">Customer</b-form-radio>
                    <b-form-radio value="false">Seller</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </b-card>
        <b-form-group label="Name:">
            <b-container>
                <b-form-row>
                    <b-col>
                        <b-form-input
                            type="text"
                            required
                            placeholder="First Name"
                            v-model="formData.firstname"
                        />
                    </b-col>
                    <b-col>
                        <b-form-input
                            type="text"
                            required
                            placeholder="Last Name"
                            v-model="formData.lastname"
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
                            v-model="formData.zipcode"
                            :state="validateZip.isValid"
                            :invalid-feedback="validateZip.message"        
                        >
                        </b-form-input>
                    </b-col>
                </b-form-row>
                
            </b-container>
        </b-form-group>
        <b-button type="submit" variant="primary" :disabled="!validateForm">Submit</b-button>
    </b-form>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        userData: Object,
        handleSubmitOverride: Function,
        sessionData: Object
    },

    data: ()=>{
        return{
        formData: {
            username: '',
            password: '',
            passwordRepeat: '',
            email: '',
            firstname: '',
            lastname: '',
            street: '',
            city: '',
            state: '',
            zipcode: '',
            isCustomer: true
            // any fields not provided are created when the user begins typing in the field
        },
       isMounted: false,
       user:{}
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
                this.formData.passwordRepeat.length >= this.formData.password.length &&
                this.formData.password !== this.formData.passwordRepeat){
                return { isValid: false, message: "Passwords do not match" }
            }

            else if (this.formData.password &&
            this.formData.password === this.formData.passwordRepeat){
                return { isValid: true, message: "Passwords match!" }
            }

            return {isValid: false, message: ""}   
        },

        validateZip(){
            if(this.formData.zipcode.length > 5){
                return {isValid: false, message: "zipcode should be 5 numbers"}
            }
            if(this.formData.zipcode.length < 5){
                return {isValid: null}
            }
            else{
                return { isValid: true }
            }
        },

        validateForm(){
            if(this.isMounted){
                return (    this.validatePassword.isValid && 
                            this.validateZip.isValid &&
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
            if(this.handleSubmitOverride){
                this.handleSubmitOverride()
            }
            else{
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/register',
                    data: { ...this.formData }
                }).then(response=>{
                    if(response.status===200){
                        this.user = response;
                        this.$emit('logged-in', this.user)
                        this.sessionDatasessionData.loggedIn = true;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
}
</script>