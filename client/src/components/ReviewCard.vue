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
                                        {{review.date | formatDate}}
                                        <br>
                                        {{review.product.name}} /
                                        {{review.product.color}} /
                                        {{review.product.size}}</small>
                                    
                                    <hr>
                                    <pre>{{review.description}}</pre>
                                    
                                    <b-container v-if="review.images">
                                        <b-row>
                                            <b-col cols="4" md="3" lg="2" v-for="(img,index) in review.images" :key="review.title + index">
                                                <b-img 
                                                    thumbnail 
                                                    class="img" 
                                                    :src="getPathToSrc(img)" 
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
                                                        :img-src="getPathToSrc(img)"
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
                                <div v-if="isAuthor" class="text-right">
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
            :title="'Editing Review:  ' + review.product.name"
        >
            <ReviewForm 
                :handleSubmit="handleEditReview" 
                @submit="showUpdateModal = false" 
                :placeholder="review"
            />
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
        index: Number,
        user_id: String
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
            var data = new FormData()
         /*   for(var key in formData){
                data.append(key, JSON.stringify(formData[key]))
            }
            data.delete('images')
            for(var i = 0; i < formData.images.length; i++){
                data.append('images', formData.images[i])
            }*/
            data.append('formData', JSON.stringify(formData))
            // images contains only the string of previously uploaded files and empty objects for new files
            // JSON.stringify can't do File objects, so do them separately here
          //  data.delete('images')
            for(var i = 0; i < formData.images.length; i++){
                data.append('images', formData.images[i])
            }
            console.log(data)
              axios({
                method: 'PUT',
                url: this.$hostname + '/reviews/' + this.review._id,
                data: data,
                headers: {"content-Type" : "multipart/form-data"}
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
        },
        getPathToSrc(src){
            return this.$hostname + "/images/reviews/" + src
        }
    },
    filters:{
        formatDate(date){
            var date = new Date(date)
            return date.toLocaleDateString("en-US")
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
        },
        isAuthor(){
            console.log(this.user_id)
            console.log(this.review.author.id)
            if(this.user_id === this.review.author.id){
                return true
            }
            return false
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
    