<template>
 
        <b-container fluid>
            <b-row>
                <b-col> 
                    <b-card class="review-card">
                        <b-container fluid>
                            <b-row>
                                <b-col offset-sm="1">
                                    <div class="text-justify"> 
                                        <font-awesome-icon icon='star' v-for="n in numWholeStars" :key="n"/>
                                        <font-awesome-icon icon='star-half-alt' v-for="n in numHalfStars" :key="n+5"/>
                                        <font-awesome-icon :icon="['far', 'star']" v-for="n in numEmptyStars" :key="n+10" />
                                        
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
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row >
                                <b-col>
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
    methods:{
        handleEditReview(){

        },
        handleDeleteReview(){

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
        }
    }
}
</script>

<style>
.review-card{
    margin-top: 5px;
    margin-bottom: 5px;
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
