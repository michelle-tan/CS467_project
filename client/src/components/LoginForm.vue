<!-- 
    NOTES : 
        * form validation is handled entirely by HTML5 input validation
        * This component emits a "logged-in" event when login is successful

-->

<template>
    <b-form @submit.prevent="handleSubmit"> 
        <b-alert variant="danger" :show="showFailure">Login failed: please try again!</b-alert>

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

import axios from 'axios'
import router from '../router'
export default {
     props: {
            sessionData: Object,
    },
    data: ()=>{
        return {
            formData: {
                username: '',
                password: ''     
            },
            showFailure: false,
            user:{}
        }
    },
    methods:{
        handleSubmit(){
             if(this.handleSubmitOverride){
                this.handleSubmitOverride()
            }else{
             axios({
                    method: 'post',
                    url: 'http://localhost:3000/login',
                    data: { ...this.formData }
                }).then(response=>{
                    if(response.status===200){
                        this.user = response;
                        this.$emit('logged-in', this.user);
                        router.push('/');

                    }else{
                        this.showFailure = true
                    }
                }).catch(err=>{
                    this.showFailure = true;
                    console.log(err)
                })
            }
        }
    }
}
</script>