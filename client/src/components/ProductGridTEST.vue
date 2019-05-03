<!-- 
Notes: 
The product icon sizes are hardcoded in the CSS right now. Need to find a way to dynamically resize them.
The Columns are set as 4, since that seemed like a good number and kept the product cards at good resolution

Currently it will list the whole data set it is passed.  Need to find a way to pagnate them to only show
16 items at a time.

CSS will need work


</script>

-->
<template>
  <div>
    <b-container>
      <b-row v-for="(row,index) in chunkedList" v-bind:key="index" class="rows" ref="rows">
        <b-col class="columns" v-for="(item,index) in row" v-bind:key="index">
          <ProductCard class="item-container" v-bind:productObject="item"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductGrid",
  components: { ProductCard },
  data() {
    return {
      cols: 4,
      rowHeight: 0,
      rows: 0,
      productList: this.productObjectArray
    };
  },
  props: {
    itemsPerSlide: {
      type: null,
      default: 16
    },
    productObjectArray: {
      type: Array
    }
  },
  computed: {
    /*https://stackoverflow.com/questions/8495687/split-array-into-chunks*/
    chunkedList() {
      let chunkList = [];
      for (let row = 0; row < this.rows; row++) {
        chunkList.push(
          this.productList.slice(row * this.cols, row * this.cols + this.cols)
        );
      }
      return chunkList;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let calcRows = Math.ceil(this.productList.length / this.cols);
      this.$set(this.$data, "rows", calcRows);
    });
  }
};
</script>

<style scoped>
.rows {
  width: 100% !important;
  display: flex !important;
}
.columns {
  display: flex !important;
  flex-direction: row !important;
  padding: 0px;
}
.item-container {
  margin: 5px;
  padding: 3px;
  width: 232px;
  height: 205px;
}
</style>


