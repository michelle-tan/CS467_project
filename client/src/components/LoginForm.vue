<!-- 
    TODO:
        * Write validation methods 
            * (basics are done, but might need to enforce more opinionated logic, like whether a username is already taken?)
        DONE -> Add a tab to switch b/w login and register
        DONE -> Flesh out registration form with the right fields

    NOTE : 
        * This component is weird because it has its emitFormData called by its parent through $refs
        * the parent then listens to the "emit-form-data" event (put the v-on directive on the component itself)
        * I thought that I could make the form reusable, but putting it into a modal to begin with meant
            the submit button was built in (separate from the form), and now this is what I have.
        * It also takes a prop called "showLogin" that determines whether the login or the registration version of the form is shown
        

    EXAMPLE: 
        <UserInfoForm ref="form" @emit-form-data="handleSumbitOrWhatever" />

-->

<template>
    <b-form>
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
        <b-button type="submit" variant="primary">Submit</b-button>
 
    </b-form>
    

</template>

<script>
export default {
    data: ()=>{
        return {
            formData: {
                username: '',
                password: ''
            
            }
        }
    },
    methods:{
        handleSubmit(){
            console.log('submit')
        }
    }
}
</script>

