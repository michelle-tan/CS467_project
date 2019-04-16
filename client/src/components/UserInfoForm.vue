<!-- 
    TODO:
        * Write validation methods
        * Add a tab to switch b/w login and register
        * Flesh out registration form with the right fields

    NOTE : 
        * This component is weird because it has its emitFormData called by its parent through $refs
        * the parent then listens to the "emit-form-data" event (put the v-on directive on the component itself)
        * I thought that I could make the form reusable, but putting it into a modal to begin with meant
            the submit button was built in (separate from the form), and now this is what I have.

    EXAMPLE: 
        <UserInfoForm ref="form" @emit-form-data="handleSumbitOrWhatever" />

-->

<template>
    <b-form v-if="showLogin" >
        <b-form-group label="Username:" label-for="username">
            <b-form-input
                type="text"
                required
                placeholder="Enter your username"
                v-model="formData.username"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
            <b-form-input
                type="password"
                required
                placeholder="Enter your password"
                v-model="formData.password"
            >
            </b-form-input>
        </b-form-group>
 
    </b-form>
    <b-form v-else>
        <b-form-group label="Username:">
            <b-form-input
                type="text"
                required
                placeholder="Choose a unique username"
                v-model="formData.username"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group label="Name:">
            <b-form-input
                type="text"
                required
                placeholder="First Name"
                v-model="formData.firstname"
            />
              <b-form-input
                type="text"
                required
                placeholder="Last Name"
                v-model="formData.lastname"
            />
        </b-form-group>
        <b-form-group label="Email:">
            <b-form-input
                type="email"
                required
                placeholder="Enter your email"
                v-model="formData.email"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group label="Password:">
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
        <b-form-group label="Register as Seller or Customer?">
            <b-form-radio-group id="isCustomerRadio" v-model="isCustomer" name="isCustomer">
                <b-form-radio value="true">Customer</b-form-radio>
                <b-form-radio value="false">Seller</b-form-radio>
            </b-form-radio-group>
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
            password: ''
            // any fields not provided are created when the user begins typing in the field
        },
        isCustomer: true
        }
    },
    methods: {
        validateUsername(){},
        validatePassword(){},
        validateEmail(){},
        emitFormData(){
            // do final validation here?
            this.$emit('emit-form-data', {...this.formData, isLogin: this.showLogin, isCustomer: this.isCustomer} );
        }

    }
}
</script>
