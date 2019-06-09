<!-- 
Notes: 
The product icon sizes are hardcoded in the CSS right now in "item-container". Need to find a way to dynamically resize them. (if we need)
The Columns are set as 4, since that seemed like a good number and kept the product cards at good resolution

The "itemsToDisplay" is hardcoded to a number multiple of 4.  I am thinking 12 for when we actually use it. but it is variable.

**Need to decide how to use the array of products that is passed in.   Currently, the product list is passed by a parent but for large large numbers this might
not be the best idea. I am wondering if we should get the product list from this component specifically.  and instead of passing the product list, pass the parameter
we want to get products by (storename, category, any other?)

CSS will need work


</script>

-->
<template>
  <div>
    <b-container>
      <!-- V1
      <b-row v-for="(row,index) in chunkedList" v-bind:key="index" class="rows" ref="rows">
        <b-col class="columns" v-for="(item,index) in row" v-bind:key="index">
          <ProductCard class="item-container" v-bind:productObject="item"/>
        </b-col>
      </b-row>
      -->

      <b-row v-for="(row,index) in chunkedList" v-bind:key="index" class="rows" ref="rows">
        <b-col sm="auto" class="columns" v-for="(item,index) in row" v-bind:key="index">
          <ProductCard class="item-container" v-bind:productObject="item"/>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="showcontrols">
      <b-button variant="primary" @click="goToPrev">Prev</b-button>
      <span
        class="nav-number"
        v-for="index in pages"
        v-bind:key="index"
        v-bind:class="[index===currentPage+1 ? 'current': '']"
        @click="setCurrPage(index-1)"
      >{{index}}</span>
      <b-button variant="primary" @click="goToNext">Next</b-button>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductGrid",
  components: { ProductCard },
  data() {
    return {
      rows: 0,
      displayList: [],
      pages: 0,
      currentPage: 0,
      showcontrols: true
    };
  },
  props: {
    productObjectArray: {
      type: Array,
      required: true
    },
    cols: {
      type: Number,
      default: 4
    },
    itemsToDisplay: {
      type: Number,
      default: 12
    }
  },
  mounted() {
    this.$nextTick(() => {
      // This function will set how many "pages" there will be. it is productObjectArray.length / itemsToDisplay
      let calcPages = Math.ceil(
        this.productObjectArray.length / this.itemsToDisplay
      );
      this.$set(this.$data, "pages", calcPages);

      // hide controls if needed
      if (this.pages === 1) {
        this.showcontrols = false;
      }

      // This function will set the inital "displayList" to the first X items in the productObjectArray
      let slicedList = this.productObjectArray.slice(0, this.itemsToDisplay);
      this.$set(this.$data, "displayList", slicedList);

      // This function will set the "rows" once the displayList array has been created and mounted.
      let calcRows = Math.ceil(this.displayList.length / this.cols);
      this.$set(this.$data, "rows", calcRows);
    });
  },
  computed: {
    //https://stackoverflow.com/questions/8495687/split-array-into-chunks
    // Function will split the array into chunks [1,2,3,4,5,6,7] => [[1,2,3],[4,5,6],[7]]
    chunkedList() {
      let chunkList = [];
      for (let row = 0; row < this.rows; row++) {
        chunkList.push(
          this.displayList.slice(row * this.cols, row * this.cols + this.cols)
        );
      }
      return chunkList;
    }
  },
  methods: {
    findEndSlice(a, b) {
      if (a < b) {
        return a;
      } else {
        return b;
      }
    },
    // Controls for the prev and next buttons. Will calculate the new array base on the current page to display
    calcNewDisplayList() {
      let start = this.currentPage * this.itemsToDisplay;
      let end = start + this.itemsToDisplay;
      if (end > this.productObjectArray.length) {
        end = this.productObjectArray.length;
      }
      return this.productObjectArray.slice(start, end);
    },
    goToPrev() {
      if (this.currentPage === 0) {
        return;
      }
      //console.log("prev clicked");
      this.currentPage--;
      this.$set(this.$data, "displayList", this.calcNewDisplayList());
    },
    goToNext() {
      if (this.currentPage === this.pages - 1) {
        return;
      }
      //console.log("next clicked");
      this.currentPage++;
      this.$set(this.$data, "displayList", this.calcNewDisplayList());
    },
    // this will set the number based on the page# clicked in the pagination bar
    setCurrPage(number) {
      this.$set(this.$data, "currentPage", number);
      this.$set(this.$data, "displayList", this.calcNewDisplayList());
    }
  }
};
</script>

<style scoped>
.rows {
  width: 100% !important;
  display: flex !important;
  margin: 20px 0 20px 0;
}
.columns {
  display: flex !important;
  flex-direction: row !important;
  padding: 0px;
}

.item-container {
  margin: 5px;
  padding: 1px;
  /*
  width: 232px;
  height: 205px;
  */
}
.nav-number {
  margin: 1px;
  background-color: white;
  padding: 1px;
  border: 1px solid black;
  cursor: pointer;
}
.nav-number.current {
  /*Change these later*/
  color: white;
  background-color: black;
}
</style>


