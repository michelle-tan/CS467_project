<!-- 
    NOTES : 
        * form validation is handled entirely by HTML5 input validation
        * This component emits a "logged-in" event when login is successful

-->

<template>
    <b-form @submit.prevent="handleSubmit"> 
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
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...this.formData })
            })
            .then(response =>{
                if(response.status === 200){
                    this.$emit('logged-in', null)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}

</script>

