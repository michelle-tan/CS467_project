<!--
    TODO: 
        * Still need to figure out how to split up the state
        * Make the remove button work
            * Maybe replace button with icon
        * Add increment/decrement buttons?

    -->

<template>
    <div>
    <b-card class="cart-card" no-body v-for="item in items" :key="item.id">             
        <b-container fluid>
            <b-row >
                <b-col cols="4">
                    <a href="#">
                        <b-img class="cart-img" :src="item.image"></b-img>
                    </a>
                </b-col>
                <b-col>
                    <b-container fluid>
                        <b-row>
                            <b-col>
                                <span class="font-weight-bold">{{item.name}}</span>
                            </b-col>
                        </b-row>
                        <b-row>
                                <b-col>
                                    <span> <small> {{item.color}} </small></span>
                                    <span v-if="item.size"> <small>({{item.size}}) </small> </span>    
                                </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="8">

                                <b-form-input 
                                    type="number" 
                                    :value="item.qty"
                                    v-model="item.qty"
                                />
    
                                
                            </b-col>
                            <b-col cols="4">
                                <a href="#" @click.stop="deleteItem(item)">
                                    <font-awesome-icon icon="times" />
                                    </a>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>

            </b-row>
        </b-container>
</b-card>
</div>
</template>

<script>

/*

<span style="padding: 5px; border: 1px solid silver; border-radius: 5px;">
    <a href="#"> <font-awesome-icon icon="minus" size="sm"/> </a>
        &nbsp;{{ item.qty }} &nbsp;
    <a href="#"> <font-awesome-icon icon="plus" size="sm"/> </a>
</span>
                                */
import axios from 'axios'
export default {
    
    props: {
        items: Array
    },
    computed:{

    },
    methods:{
        deleteItem(item){
        var idx = this.items.findIndex((el) => {
            return el.id === item.id
        })
            var product_id = this.items[idx].id
            this.items.splice(idx, 1);
            axios({
                method: "DELETE",
                url: this.$hostname + "/cart",
                data: { id: product_id}
            }).then(result=>{
                console.log(result)
            }).catch(err=>{
                console.log('err :', err);
            })
        }
    }
}
</script>

<style>
.cart-card{
    padding: 0.5rem;

}
.cart-img{
    width: 6rem;
    height: auto;
    align-self: center;
}

/* this removes HTML arrows on number type form inputs 
https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box
*/

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>
