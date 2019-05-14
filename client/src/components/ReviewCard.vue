<template>
    <b-container fluid>
        <b-row>
            <b-col> 
                <b-card class="review-card">
                    <b-container fluid>
                        <b-row>
                            <b-col offset-sm="1">
                                <div class="text-justify"> 
                                    <font-awesome-icon icon='star' v-for="n in numWholeStars" :key="'ws'+n"/>
                                    <font-awesome-icon icon='star-half-alt' v-for="n in numHalfStars" :key="'hs' + n"/>
                                    <font-awesome-icon :icon="['far', 'star']" v-for="n in numEmptyStars" :key="'es' + n" />
                                    
                                    <br>
                                    <strong>{{review.title}}</strong>
                                    <br>
                                    <small>
                                        {{review.date}}
                                        <br>
                                        {{review.product}} /
                                        {{review.color}} /
                                        {{review.size}}</small>
                                    
                                    <hr>
                                    <pre>{{review.description}}</pre>
                                    
                                    <b-container v-if="review.images">
                                        <b-row>
                                            <b-col cols="4" md="3" lg="2" v-for="(img,index) in review.images" :key="review.title + index">
                                                <b-img 
                                                    thumbnail 
                                                    class="img" 
                                                    :src=img 
                                                    v-b-modal.imgModal 
                                                    @click="currentModalImageIndex=index"
                                                />                                            
                                            </b-col>
                                        </b-row>
                                        <b-modal 
                                            id="imgModal"
                                            centered 
                                        >  
                                            <div slot="modal-title">
                                                {{review.title}} 
                                                <small> (image {{currentModalImageIndex + 1}} of {{numImages}}) </small>
                                            </div>
                                            <b-carousel
                                                id="img-carousel"
                                                v-model="currentModalImageIndex"
                                                :interval="0"
                                                controls
                                                indicators
                                                background="#ababab"
                                                
                                                @sliding-start="onSlide"
                                                
                                            >               
                                                <div
                                                    v-for="(img,index) in review.images"
                                                    :key="index"
                                                >
                                                    <b-carousel-slide 
                                                        :img-src="img"
                                                        class="img"
                                                    />
                                                </div>
                                            </b-carousel>
                                                <!-- removes default buttons from modal -->
                                            <div slot="modal-footer" />
                                        </b-modal>
                                    </b-container>
                                    
                                </div>
                            </b-col>
                        </b-row>
                        <!-- show this row only if you wrote this review! -->
                        <b-row >
                            <b-col>
                                <hr>
                                <div class="text-right">
                                    <font-awesome-icon class="icon" @click="showUpdateModal = true" icon="pencil-alt" />
                                    <font-awesome-icon class="icon"  @click="handleDeleteReview" icon="trash-alt" />
                                </div>
                                </b-col>
                            
                        </b-row>

                    </b-container>
                </b-card>
            </b-col>
        </b-row>
        <b-modal
            v-model="showUpdateModal"
            centered
            title="Edit Your Review"
        >
            <ReviewForm :handleSubmit="handleEditReview" @submit="showUpdateModal = false" :placeholder="review"/>
            <div slot="modal-footer"></div>
        </b-modal>
    </b-container>    
</template>

<script>
import axios from 'axios'
import ReviewForm from './ReviewForm.vue'

export default {
    props: {
        review : Object,
        index: Number
    },
    components: {
        ReviewForm,
    },
    data:()=>{
        return{
            currentModalImageIndex: 0,
            showUpdateModal: false
        }
    },
    methods:{
        handleEditReview(formData){
            console.log("editing")
            console.log(formData)

              axios({
                method: 'PUT',
                url: this.$hostname + '/reviews/' + this.review._id,
                data: {updateData: {...formData}}
            }).then(response=>{
                if(response.status===200){
                    this.showUpdateModal = false
                    this.$emit('update:reviews', {index: this.index, updateData: {...response.data}})
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        handleDeleteReview(){
            axios({
                method: 'DELETE',
                url: this.$hostname + '/reviews/' + this.review._id
            }).then(response=>{
                if(response.status===200){
                    this.showUpdateModal = false
                    this.$emit('delete:reviews', this.index)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        onSlide(slide){
            this.currentModalImageIndex = slide
        }
    },
    computed:{
        numWholeStars(){
            return Math.floor(this.review.rating)

        },
        numHalfStars(){
            return Math.ceil(this.review.rating) - Math.floor(this.review.rating) === 1 ? 1 : 0
        },
        numEmptyStars(){
            return 5 - Math.ceil(this.review.rating)
        },
        numImages(){
            return this.review.images.length
        }
    }
}
</script>

<style>
.review-card{
    margin-top: 5px;
    margin-bottom: 5px;
}
.img{
    width: 100%;
}
.icon{
   margin: 10px
}
.icon:hover{
    color: grey
}
pre{
    font-family: Verdana, Geneva, Tahoma, sans-serif
}
</style>
    