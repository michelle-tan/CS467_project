<template>
  <div>
    <div class="text-left h3" style="margin-left:1em; margin-top:1em">Welcome to Kuma!</div>
    <hr>
    <ProductGrid v-if="productsDisplayed.length" :productObjectArray="productsDisplayed" />
  </div>
</template>

<script>
import axios from 'axios'
import ProductGrid from "@/components/ProductGrid.vue"
export default {
  components:{
    ProductGrid
  },
  props:{
    sessionData: Object
  },
  data: ()=>{
    return{
      productsDisplayed: []
    }
  },
  created(){
    axios.get(this.$hostname + '/products/allProducts').then(result=>{
      if(result.status===200){
        this.$set(this.$data, 'productsDisplayed', result.data)
      }
      else{
        this.$router.push(this.$hostname + '/500')
      }
    }).catch(err=>{
      console.log('err :', err);
    })
  }
}
</script>

<style>

</style>
