<template>
  <div class="container">
    <h1>This is the store owner page (if they are one)</h1>

    <ManageInventory storeToGet="DomStore"></ManageInventory>
    <br>
    <hr>
    <br>
    <ManageInventory storeToGet="SteveStore"></ManageInventory>
  </div>
</template>

<script>
import ManageInventory from "../components/ManageInventory.vue";
export default {
  name: "AccountStoreOwner",
  components: { ManageInventory },
  data() {
    return {};
  }
};
</script>

<style>
</style>


