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
        <b-form-group label="Username:" label-for="username">
            <b-form-input
                type="text"
                required
                placeholder="Choose a unique username"
                v-model="formData.username"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group label="Email:" label-for="email">
            <b-form-input
                type="email"
                required
                placeholder="Enter your email"
                v-model="formData.email"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
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
    </b-form>

</template>

<script>
export default {
    data: ()=>{
        return{
        showLogin: false,
        formData: {
            username: '',
            password: ''
            // any fields not provided are created when the user begins typing in the field
        }
        }
    },
    methods: {
        validateUsername(){},
        validatePassword(){},
        validateEmail(){},
        emitFormData(){
            // do final validation here?
            this.$emit('emit-form-data', {...this.formData, isLogin: this.showLogin} );
        }

    }
}
</script>
