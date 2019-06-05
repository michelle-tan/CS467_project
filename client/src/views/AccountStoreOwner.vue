<template>
  <div class="container">
    <div>
      <h1>Manage Store Inventory: {{this.sessionData.userinfo.username}}</h1>
    </div>
    <hr>
    <div>
      <select v-model="selected">
        <option value disabled selected>Select a Store</option>
        <option v-for="store in stores" :value="store" v-bind:key="store">{{ store }}</option>
      </select> (User may have to refresh in order to see stores)
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
      stores: ""
    };
  },
  props: {
    sessionData: Object
  },
  created() {
    this.$nextTick(() => {
      this.$set(this.$data, "stores", this.sessionData.userinfo.storesOwned);
    });
  }
};
</script>

<style>
.container {
  margin-top: 25px;
}
</style>


