<!--
    TODO: 
        * Still need to figure out how to split up the state
        * Make the remove button work
            * Maybe replace button with icon
        * Add increment/decrement buttons?

    -->

<template>
    <div>
        <div v-for="store in cart" :key="store.storeInfo.sellerId">
            <b-card class="cart-card" no-body v-for="item in store.items" :key="item.id">       
                <div class="d-flex align-items-center">
                    <div class="p-6">
                        <a :href="'/products/item/' + item.id">
                                <b-img class="cart-img" :src="item.image"></b-img>
                        </a>
                    </div>
                    <div class="p-2">
                        <div class="d-flex flex-column">
                            <div>
                                <span class="font-weight-bold">{{item.name}}</span>
                            </div>
                        
                            <div>
                                <b-input-group class="mt-3">
                                    <b-input-group-append slot="prepend">
                                        <b-button size="sm" @click="item.qty--; updateCart(item.qty, item.id)">
                                            <font-awesome-icon size="xs" icon="minus" />

                                        </b-button>
                                    </b-input-group-append>

                                    <b-form-input v-model="item.qty"></b-form-input>

                                    <b-input-group-append >
                                        <b-button size="sm"  @click="item.qty++; updateCart(item.qty, item.id)">
                                        <font-awesome-icon size="xs" icon="plus"/>
                                        </b-button>

                                        
                                    </b-input-group-append>                                                
                                </b-input-group>
                            </div>


                        </div>
                    </div>
                    <div class="p-2">
                        <font-awesome-icon class="icon" size="lg" icon="times" @click.stop="deleteItem(store.storeInfo.sellerId, item.id)"/>
                    </div>
                </div>
                <!--b-container fluid>
                    <b-row >
                        <b-col cols="4">
                            <a :href="'/products/item/' + item.id">
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
                                    <b-col>

                                        <b-input-group class="mt-3">
                                            <b-input-group-append slot="prepend">
                                                <b-button size="sm" @click="item.qty--">
                                                    <font-awesome-icon size="xs" icon="minus" />

                                                </b-button>
                                            </b-input-group-append>
                           
                                            <b-form-input v-model="item.qty"></b-form-input>

                                            <b-input-group-append >
                                                <b-button size="sm"  @click="item.qty++">
                                                <font-awesome-icon size="xs" icon="plus"/>
                                                </b-button>

                                                
                                            </b-input-group-append>                                                
                                        </b-input-group>
                                         <b-button size="sm"  @click="deleteItem(store.storeInfo.sellerId, item.id)">
                                               <font-awesome-icon size="xs" icon="times" />
                                                </b-button>

                                    </b-col>


                            
                                       
                                </b-row>
                            </b-container>
                        </b-col>

                    </b-row>
                </b-container-->
        </b-card>
    </div>
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
        cart: Array
    },
    computed:{

    },
    methods:{
        deleteItem(sellerId,itemId){
            console.log('deleting')
            axios({
                method: "DELETE",
                url: this.$hostname + "/cart",
                data: { sellerId: sellerId, itemId: itemId}
            }).then(result=>{
                                    console.log(result)

                if(result.status===200){
                    console.log(result)
                    this.$emit('deleteCartItem', {cart: result.data})
                }
            }).catch(err=>{
                console.log('err :', err);
            })
        },
         updateCart(qty, item_id){
            // if you remove the last instance of an item, the item should be deleted from the cart
            var storeIndex, itemIndex
            if(qty < 1){
                storeIndex = this.cart.findIndex((store)=>{
                    itemIndex = store.items.findIndex((item)=>{
                        return item.id === item_id
                    })
                    return itemIndex !== -1
                })
                this.cart[storeIndex].items.splice(itemIndex, 1)
                console.log('this.cart[storeIndex].items :', this.cart[storeIndex].items);
                if(this.cart[storeIndex].items.length ===0){
                    this.cart.splice(storeIndex,1)
                    console.log('this.cart', this.cart)
                }
            }    
           
            axios({
                method: "PUT",
                url: this.$hostname + "/cart",
                data: {cart:JSON.stringify(this.cart)}
            }).then(response=>{
  //              this.$emit("update:sessionData", {cart: response.data})
            }).catch(err=>{
                console.log('err', err)
            })

        }
    },
       
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

.icon:hover{
    color: slategrey
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
