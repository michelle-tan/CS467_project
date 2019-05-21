<template>
  <div class="container">
    <h1> {{this.sessionData.userinfo.username}} </h1>
    <div>
    <select v-model = "selected">
        <option v-for = "store in stores" :value = "store"  v-bind:key="store"> {{ store }} </option>
    </select>
    </div>
    <ManageInventory :storeToGet= "selected"></ManageInventory>
    <br>
    <hr>
    <br>
    
  </div>
</template>

<script>
import ManageInventory from "../components/ManageInventory.vue";
export default {
  name: "AccountStoreOwner",
  components: { ManageInventory },

  data() {
    return{
    selected: '',
    stores: this.sessionData.userinfo.stores
    }
    
    
  },
  props:{
    sessionData:Object

  }
};
</script>

<style>
</style>


