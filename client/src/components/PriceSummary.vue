<template>
    <b-container style="margin-bottom: 20px">
        <b-row align-h="end">
            <b-col >
                <strong>Subtotal: </strong>
            </b-col>
            <b-col >
                $&nbsp;{{ subtotalSum | toFixed2 }} 
            </b-col>
        </b-row>
        <div v-if="!subtotalOnly">
            <b-row>
                <b-col >
                    <strong>Shipping: </strong>
                </b-col>
                <b-col >
                    <div v-if="this.shippingSum || cart.length ===0"> $&nbsp;{{ shippingSum | toFixed2 }} </div>
                    <div v-else> FREE! </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col >
                    <strong>Tax: </strong>
                </b-col>
                <b-col >
                    $&nbsp;{{ taxSum | toFixed2 }} 
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <strong>Total: </strong>
                </b-col>
                <b-col >
                    $&nbsp;{{ total | toFixed2}} 
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
export default {
    props:{
        cart: Array,
        subtotalOnly: Boolean
    },
    data: ()=>{
        return{
            taxRate: 0.05,

        }
    },
    filters:{
        toFixed2(val){
            return val.toFixed(2)
        }
    },
    computed:{
        subtotalArray(){
            var subtotalArray = []
            
            for(var i =0; i < this.cart.length ; i++){
                var storeSubtotal = 0

                for(var j = 0 ; j < this.cart[i].items.length; j++){
                    storeSubtotal += this.cart[i].items[j].price * this.cart[i].items[j].qty
                }

                subtotalArray.push(storeSubtotal)
            }

            return subtotalArray
        },
        subtotalSum(){
            var subtotal = 0
            for(var i =0; i < this.subtotalArray.length ; i++){
                subtotal += this.subtotalArray[i]
            }
            return subtotal
        },

        taxArray(){
            var taxArray = []
            for(var i =0; i < this.cart.length ; i++){
                taxArray.push(Math.ceil((this.subtotalArray[i] * this.taxRate * 100)/100))
            }
            return taxArray

        },
        taxSum(){
            var taxSum=0
            for(var i =0; i < this.subtotalArray.length ; i++){
                taxSum += this.taxArray[i]
            }
            return taxSum
        },
        shippingArray(){
            var shippingArray=[]
            for(var i =0; i < this.cart.length ; i++){
                shippingArray.push(this.subtotalArray[i] < 25 ? 5 : 0)
            }
            return shippingArray
        },
        shippingSum(){
            var shippingSum=0
            for(var i =0; i < this.subtotalArray.length ; i++){
                shippingSum += this.shippingArray[i]
            }
            return shippingSum
        },

        total(){
            return Math.ceil((this.subtotalSum + this.shippingSum + this.taxSum)*100)/100
        }
    }

}
</script>

<style>

</style>
