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
                                    <font-awesome-icon class="icon" @click="handleEditReview" icon="pencil-alt" />
                                    <font-awesome-icon class="icon"  @click="handleDeleteReview" icon="trash-alt" />
                                </div>
                                </b-col>
                            
                        </b-row>

                    </b-container>
                </b-card>
            </b-col>
        </b-row>
    </b-container>    
</template>

<script>
export default {
    props: {
        review : Object
    },
    data:()=>{
        return{
            currentModalImageIndex: 0
        }
    },
    methods:{
        handleEditReview(){

        },
        handleDeleteReview(){

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
    