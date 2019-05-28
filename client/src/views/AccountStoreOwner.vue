<template>
  <div class="container">
    <h1>Store Owner: {{this.sessionData.userinfo.username}}</h1>
    <div>
      <select v-model="selected">
        <option value disabled selected>Select a Store</option>
        <option v-for="store in stores" :value="store" v-bind:key="store">{{ store }}</option>
      </select>
    </div>
    <ManageInventory :storeToGet="selected"></ManageInventory>
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
      stores: null
    };
  },
  props: {
    sessionData: Object
  },
  mounted() {
    this.$nextTick(() => {
      this.$set(this.$data, "stores", this.sessionData.userinfo.storesOwned);
    });
  }
};
</script>

<style>
</style>


