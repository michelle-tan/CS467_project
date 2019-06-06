<template>
    <b-container style="margin-bottom: 20px">
        <b-row align-h="end">
            <b-col >
                <strong>Subtotal: </strong>
            </b-col>
            <b-col >
                $&nbsp;{{ subtotal | toFixed2 }} 
            </b-col>
        </b-row>
        <b-row>
            <b-col >
                <strong>Shipping: </strong>
            </b-col>
            <b-col >
                <div v-if="this.shippingIncurred"> $&nbsp;{{ shippingIncurred | toFixed2 }} </div>
                <div v-else> FREE! </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col >
                <strong>Tax: </strong>
            </b-col>
            <b-col >
                $&nbsp;{{ taxIncurred | toFixed2 }} 
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

    </b-container>
</template>

<script>
export default {
    props:{
        items: Array,
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
        subtotal(){
            var subtotal = 0
            for(var i =0; i < this.items.length ; i++){
                subtotal += (this.items[i].price * this.items[i].qty)
            }
            return subtotal
        },
                subtotal(){
            var subtotal = 0;
            for(var i = 0 ; i < this.items.length; i++){
                subtotal += this.items[i].qty * this.items[i].price
            }
            return subtotal;
        },
        taxIncurred(){
            return (Math.ceil(this.subtotal * this.taxRate * 100) / 100)
        },
        shippingIncurred(){
            if(this.subtotal < 25){
                return 5
            }
            else return 0
        },

        total(){
            return Math.ceil((this.subtotal + this.shippingIncurred + this.taxIncurred)*100)/100
        }
    }

}
</script>

<style>

</style>
