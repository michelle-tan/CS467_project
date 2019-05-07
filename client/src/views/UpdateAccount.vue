<template>
<div class="update-form">
    <h3 >Update account details</h3>
    <RegistrationForm v-show="true" :userData="userData" :handleSubmitOverride="handleSubmit"/>
    </div>
</template>

<script>
import RegistrationForm from '../components/RegistrationForm'
export default {
    components:{
        RegistrationForm
    },
    data: ()=>{
        return{
            userData: {
                username: '',
                email: '',
                firstname: '',
                lastname: '',

                // do not fetch password, it is only here to keep the property reactive
                password: '',
                passwordRepeat: '',

                street: '',
                city: '',
                state: '',
                zipcode: '',
                isCustomer: true
            },
        }
    },
    mounted: function(){
        // get initial userData here

    },
    methods:{
        handleSubmit(){
            console.log("hi")
        }
    }
}
</script>

<style>
.update-form{
    margin: 10px;
}
</style>


