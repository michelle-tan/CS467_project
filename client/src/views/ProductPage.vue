<template>
    <div>
        <b-button @click="showAddReviewModal = true">Add review</b-button>
        Here's a product page
       
        <b-modal
            title="Add a review:"
            v-model="showAddReviewModal"
            centered
        >
            <ReviewForm
                :handleSubmit="handleSubmit"
            />
        </b-modal>
    </div>
</template>

<script>
import ReviewForm from '@/components/ReviewForm.vue'
export default {
    data: ()=>{
        return{
            showAddReviewModal: false
        }
    },
    components:{
        ReviewForm
    },
    methods:{
        handleSubmit(){
            console.log("submitting")
        }
    }
}
</script>

<style>

</style>
