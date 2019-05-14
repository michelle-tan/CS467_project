<template>
    <div>
        <div class="h2 text-left title-text">Your Reviews:</div>
        <hr>
        
        <div v-for="(review,index) in reviews" :key="index">
            <ReviewCard :review="review" :index="index" @update:reviews="updateReviews" @delete:reviews="deleteReviews"/>
        </div>

    </div>
</template>

<script>

import ReviewCard from '@/components/ReviewCard.vue'
import axios from 'axios'

export default {
    props:{
        sessionData: Object
    },
    components:{
        ReviewCard
    },
    data: () =>{
        return{
            reviews: []
        }
    },
    created(){
        //fetch review data here
        axios({
            method: "GET",
            url: this.$hostname + '/reviews/byUser/' + this.sessionData.userinfo.username
        }).then(response=>{
            if(response.status===200){
                console.log(response)
                this.reviews = JSON.parse(JSON.stringify(response.data)) //deep copy
            }
        }).catch(err=>{
            console.log(err)
            this.$router.push('/500')
        })
    },
    methods:{
        updateReviews(updated){
            var temp
            temp = JSON.parse(JSON.stringify(this.reviews))
            temp[updated.index] = {...updated.updateData}
            this.reviews = temp
        },
        deleteReviews(index){
            this.reviews.splice(index, 1)
        }
    }
}
</script>

<style>

.title-text{
    margin-top:20px;
    margin-left: 15px;
}

</style>

