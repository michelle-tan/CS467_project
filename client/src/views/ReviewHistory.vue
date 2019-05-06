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
                description: "cool guy, too smol",
                images: [
                    "https://i.etsystatic.com/18460845/d/il/4ae257/1887124899/il_680x540.1887124899_1b5s.jpg",
                    "https://i.etsystatic.com/18460845/c/1854/1472/54/0/il/1aa005/1706559720/il_680x540.1706559720_am80.jpg",
                    "https://i.etsystatic.com/18460845/c/1506/1196/943/354/il/e43003/1839670678/il_680x540.1839670678_7czw.jpg"
                    ]
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

