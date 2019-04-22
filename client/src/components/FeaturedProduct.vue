<template>
  <div class="slides">
    <div
      class="slides-inner"
      v-bind:style="{width:innerWidth+'px', marginLeft: '-'+slidesInnerMarginLeft+'px'}"
    >
      <!-- Debugging
      <p>
        {{singleWidth}}
        <br>
        {{innerWidth}}
      </p>
      -->

      <ProductCard
        class="featItem"
        v-for="(slide,index) in slides"
        v-bind:productObject="slide"
        v-bind:style="{width: singleWidth + 'px'}"
        v-bind:key="index+1"
      />
    </div>
    <div class="navigation">
      <span @click="goToPrev">Prev</span>
      <span
        class="nav-number"
        v-for="index in slides.length-itemsPerSlide+1"
        v-bind:key="index"
        v-bind:class="[index===currentIndex+1 ? 'current': '']"
      >{{index}}</span>
      <span @click="goToNext">Next</span>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
export default {
  name: "FeaturedProduct",
  components: {
    ProductCard
  },
  data() {
    return {
      slides: this.productObjectArray,
      innerWidth: 0,
      singleWidth: 0,
      currentIndex: 0
    };
  },
  props: {
    itemsPerSlide: {
      // If you want to change the images shown in the intial slide. default is 4 type HAS to be null. Number gave errors
      type: null,
      default: 4
    },
    productObjectArray: {
      type: Array
    }
  },
  mounted() {
    // This is to resize the images if you change the "itemsPerSlide"
    // add a v-bind:style={"width: singleWidth+'px"} to the element
    this.$nextTick(() => {
      let singleWidth = this.$el.clientWidth / this.itemsPerSlide;
      /* 
      if (singleWidth > 250) {
        singleWidth = 250;
      }
      */
      this.$set(this.$data, "singleWidth", singleWidth);
      this.$set(
        this.$data,
        "innerWidth",
        /*singleWidth * this.slides.length*/ this.$el.clientWidth
      );
    });
  },
  computed: {
    slidesInnerMarginLeft() {
      return this.currentIndex * this.singleWidth;
    }
  },
  methods: {
    goToPrev() {
      if (this.currentIndex === 0) {
        return;
      }
      this.currentIndex--;
      console.log("prev clicked");
    },
    goToNext() {
      if (this.currentIndex === this.slides.length - this.itemsPerSlide) {
        return;
      }
      this.currentIndex++;
      console.log("next clicked");
    }
  }
};
</script>

<style scoped>
.featItem {
  padding-right: 10px;
}

.slides {
  overflow-x: hidden;
  white-space: nowrap;
}
.slides-inner {
  transition: margin 0.6s ease-out;
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


