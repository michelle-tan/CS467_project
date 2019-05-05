<template>
    <div>
        <div class="h2 text-left title-text">Your Reviews:</div>
        <hr>
        
        <div v-for="(review,index) in reviews" :key="index">
            <ReviewCard :review="review"/>
        </div>

    </div>
</template>

<script>

import ReviewCard from '@/components/ReviewCard.vue'

export default {
    components:{
        ReviewCard
    },
    data: () =>{
        return{
            reviews: [
            
            {
                title: "wrong size, one star",
                product: "cat",
                size: "smol",
                color: "brown",
                rating: 3.5,
                date: "January 1, 2019",
                description: "cool guy, too smol"
            },
            {
                title: "wrong size, one star",
                product: "cat",
                size: "smol",
                color: "brown",
                rating: 4,
                date: "December 15, 2019",
                description: "cool guy, too smol \n\n ...but v cool"
            }
            ]
        }
    },
    created(){
        //fetch review data here
    }

}
</script>

<style>

.title-text{
    margin-top:20px;
    margin-left: 15px;
}

</style>

