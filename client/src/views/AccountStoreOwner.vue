<template>
  <div class="container">
    <h1>Store Owner: {{this.sessionData.userinfo.username}}</h1>
    <div>
      <select v-model="selected">
        <option value disabled selected>Select a Store</option>
        <option v-for="store in stores" :value="store" v-bind:key="store">{{ store }}</option>
      </select>
    </div>
    <ManageInventory :storeToGet="selected" :sessionData="sessionData"></ManageInventory>
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
    return {
      selected: "",
      stores: this.sessionData.userinfo.storesOwned
    };
  },
  props: {
    sessionData: Object
  }
};
</script>

<style>
.container {
  margin-top: 25px;
}
</style>


