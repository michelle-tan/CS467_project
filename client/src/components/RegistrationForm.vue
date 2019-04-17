<template>
    <b-form>
        <b-form-group label="Username:"
                        :state="validateUsername.isValid"
                :invalid-feedback="validateUsername.message">
            <b-form-input
                type="text"
                required
                placeholder="Choose a unique username"
                v-model="formData.username"

            >
            </b-form-input>
        </b-form-group>
        <b-form-group label="Email:"
        :state="validateEmail.isValid"
        :invalid-feedback="validateEmail.message"
        >
            <b-form-input
                id="email"
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
                <b-form-radio-group id="isCustomerRadio" v-model="isCustomer" name="isCustomer">
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
                        >
                        </b-form-input>
                    </b-col>
                </b-form-row>
                
            </b-container>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</template>

<script>
export default {
    props:{
        showLogin: Boolean
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
            zipcode: ''
            // any fields not provided are created when the user begins typing in the field
        },
        isCustomer: true,
        isMounted: false
        }
    },

    mounted(){
        this.isMounted = true
    },

    computed: {
        validateUsername(){
            if(!this.formData.username){
                return { isValid: false, message: "Username must not be blank" }
            }
            return { isValid: true, message:'' }
        },
        validatePassword(){
            if(this.formData.password !== this.formData.passwordRepeat){
                return { isValid: false, message: "Passwords do not match" }
            }
            if(!this.formData.password || !this.formData.passwordRepeat){
                return { isValid: false, message: "Password fields are incomplete" }
            }

            return {isValid: true, message: "Passwords match!"}
            
        },
        validateEmail(){
            // computed property needs to reference a reactive dependency AND component must mount to access this.$refs
            if(this.formData.email.length > 1 && this.isMounted){
                return {
                    isValid: this.$refs.emailInput.checkValidity(),
                    message: this.$refs.emailInput.validationMessage
                }
            }
            else{
                return {
                    isValid: false
                }
            }
        },
    },
    methods:{
        handleSubmit(){
            console.log('submit')
        }

    }
}
</script>