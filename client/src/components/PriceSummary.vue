<template>
    <b-container style="margin-bottom: 20px">
        <b-row align-h="end">
            <b-col offset-md="7" sm="2" offset-sm="8" cols="4" offset="4">
                <strong>Subtotal: </strong>
            </b-col>
            <b-col >
                $&nbsp;{{ subtotal }} 
            </b-col>
        </b-row>
        <b-row>
            <b-col offset-md="7" sm="2" offset-sm="8" cols="4" offset="4">
                <strong>Shipping: </strong>
            </b-col>
            <b-col >
                <div v-if="this.shipping"> $&nbsp;{{ shipping }} </div>
                <div v-else> FREE! </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col offset-md="7" sm="2" offset-sm="8" cols="4" offset="4">
                <strong>Tax: </strong>
            </b-col>
            <b-col >
                $&nbsp;{{ tax }} 
            </b-col>
        </b-row>
        <b-row>
            <b-col offset-md="7" sm="2" offset-sm="8" cols="4" offset="4">
                <strong>Total: </strong>
            </b-col>
            <b-col >
                $&nbsp;{{ total }} 
            </b-col>
        </b-row>

    </b-container>
</template>

<script>
export default {
    props:{
        items: Array
    },
    computed:{
        subtotal(){
            var subtotal = 0
            for(var i =0; i < this.items.length ; i++){
                subtotal += (this.items[i].unitPrice * this.items[i].qty)
            }
            return subtotal.toFixed(2)
        },
        // 10% tax
        tax(){
            return (this.subtotal * 0.1).toFixed(2)
        },

        // free shipping over $50
        shipping(){
            if(this.subtotal >= 50){
                return 0
            }
            else{
                return (5.99).toFixed(2)
            }
        },

        total(){
            return (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2)
        }
    }

}
</script>

<style>

</style>
