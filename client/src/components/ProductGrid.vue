<template>
  <div>
    <p>
      <label>Columns:</label>
      <input type="number" v-model="cols">
    </p>
    <div class="container">
      <div class="col" v-for="(column,index) in calculateColumns" v-bind:key="index">
        <div class="item-container" v-for="(item,index) in column" v-bind:key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductGrid",
  data() {
    return {
      productList: [
        { name: "beats headphones #1", price: "100.50" },
        { name: "beats headphones #2", price: "100.50" },
        { name: "beats headphones #3", price: "100.50" },
        { name: "beats headphones #4", price: "100.50" },
        { name: "beats headphones #5", price: "100.50" },
        { name: "beats headphones #6", price: "100.50" },
        { name: "beats headphones #7", price: "100.50" },
        { name: "beats headphones #8", price: "100.50" },
        { name: "beats headphones #9", price: "100.50" },
        { name: "beats headphones #10", price: "100.50" },
        { name: "beats headphones #11", price: "100.50" },
        { name: "beats headphones #12", price: "100.50" },
        { name: "beats headphones #13", price: "100.50" },
        { name: "beats headphones #14", price: "100.50" },
        { name: "beats headphones #15", price: "100.50" },
        { name: "beats headphones #16", price: "100.50" }
      ]
    };
  },
  props: {
    cols: {
      type: Number,
      default: 4
    }
  },
  computed: {
    /*https://stackoverflow.com/questions/8495687/split-array-into-chunks*/
    calculateColumns() {
      let chunkList = [];
      let itemsPerChunk = Math.ceil(this.productList.length / this.cols);
      for (let col = 0; col < this.cols; col++) {
        chunkList.push(
          this.productList.slice(
            col * itemsPerChunk,
            col * itemsPerChunk + itemsPerChunk
          )
        );
      }
      return chunkList;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  border: 1px solid;
}
.col {
  margin: 10px;
  border: 1px solid;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.item-container {
  border: 1px solid;
  padding: 5px;
  margin: 5px;
}
</style>


