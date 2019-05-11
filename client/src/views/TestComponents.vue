<template>
  <div class="container">
    <h1>This is the testing page of the components</h1>
    <hr>

    <br>
    <h4>Product Card</h4>
    <div id="test">
      <ProductCard :productObject="testobject"/>
    </div>
    <br>
    <h4>Product Ribbon</h4>
    <ProductRibbon :productObjectArray="productList"/>

    <br>
    <h4>Product Grid TEST</h4>
    <ProductGrid :productObjectArray="productList"/>

    <br>
    <br>
  </div>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import ProductRibbon from "@/components/ProductRibbon.vue";
import ProductGrid from "@/components/ProductGrid.vue";

export default {
  name: "testComponents",
  components: { ProductCard, ProductRibbon, ProductGrid },
  data() {
    return {
      testobject: {
        name: "beats headphones",
        price: "100.50",
        image:
          "https://res.cloudinary.com/teepublic/image/private/s--fZSzwgC7--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1527665318/production/designs/2737304_0.jpg"
      },
      productList: [
        {
          name: "beats headphones #1",
          price: "100.50",
          image:
            "https://vignette.wikia.nocookie.net/love-live/images/c/cb/LLSS_S1Ep6_235.png/revision/latest?cb=20160806180336"
        },
        {
          name: "beats headphones #2",
          price: "100.50",
          image:
            "https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/07/Harukana1-19.png?resize=1024%2C576&ssl=1"
        },
        {
          name: "beats headphones #3",
          price: "100.50",
          image: "https://i.imgur.com/9y1wkv6.jpg"
        },
        {
          name: "beats headphones #4",
          price: "100.50",
          image:
            "https://images-na.ssl-images-amazon.com/images/I/91JdzvaB-GL._RI_.jpg"
        },
        {
          name: "beats headphones #5",
          price: "100.50",
          image:
            "https://res.cloudinary.com/teepublic/image/private/s--eSAoDaOc--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1534682471/production/designs/3040733_0.jpg"
        },
        {
          name: "beats headphones #6",
          price: "100.50",
          image:
            "https://www.listchallenges.com/f/items/5e86fe66-eefa-4db0-aa06-bf076f8e5441.jpg"
        },
        {
          name: "beats headphones #7",
          price: "100.50",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbb0saGwBmzZ-Xi7fkCp0EABbiMGUWFej-7cJgcQv6mwKwRPdD"
        },
        {
          name: "beats headphones #8",
          price: "100.50",
          image: "https://img.fireden.net/v/image/1534/41/1534411052845.png"
        },
        {
          name: "beats headphones #9",
          price: "100.50",
          image:
            "https://i0.wp.com/drunkenanimeblog.com/wp-content/uploads/2018/07/screen-shot-2018-07-13-at-10-32-56-pm.png?resize=620%2C347&ssl=1"
        },
        {
          name: "beats headphones #10",
          price: "100.50",
          image:
            "https://d3ieicw58ybon5.cloudfront.net/ex/1200.630/0.133.600.316/u/160a8c89b92744ccb8d992dd8e685cf2.jpg"
        },
        {
          name: "beats headphones #11",
          price: "100.50",
          image:
            "https://deluscar.files.wordpress.com/2015/01/horriblesubs-shirobako-01-720p-mkv_snapshot_01-49_2015-01-20_21-20-08.jpg?w=774&h=435"
        },
        {
          name: "beats headphones #12",
          price: "100.50",
          image:
            "https://i2.wp.com/wrongeverytime.com/wp-content/uploads/2015/04/HorribleSubs-Shirobako-24-720p.mkv_snapshot_24.22_2015.03.28_19.43.02.jpg"
        },
        {
          name: "beats headphones #13",
          price: "100.50",
          image: "https://i.imgur.com/uVDmqK0.jpg"
        },
        {
          name: "beats headphones #14",
          price: "100.50",
          image:
            "https://www.animefeminist.com/wp-content/uploads/2017/03/SakuraQuest3.png"
        },
        {
          name: "beats headphones #15",
          price: "100.50",
          image: "https://i.imgur.com/sZRSMQ8.jpg"
        },
        {
          name: "beats headphones #16",
          price: "100.50",
          image:
            "https://remyfool.files.wordpress.com/2017/09/ed-8.jpg?w=924&h=0&crop=1"
        },
        {
          name: "beats headphones #17",
          price: "100.50",
          image:
            "https://thumbs.gfycat.com/FabulousMajesticFinnishspitz-poster.jpg"
        },
        {
          name: "beats headphones #18",
          price: "100.50",
          image: "https://i.imgur.com/ZUfBQzW.jpg"
        },
        {
          name: "beats headphones #19",
          price: "100.50",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgI4-a-gbKESRCX7gLbnSukyRx21drab8NH8MVJ1qoVFtKlG-rCQ"
        }

        /*,
        {
          name: "beats headphones #20",
          price: "100.50",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZK9eODqqVTjoHGmRy1J4pygPhaULiFTeZn9at99KtN4aBAKov0w"
        },
        {
          name: "beats headphones #21",
          price: "100.50",
          image: "https://i.ytimg.com/vi/ZlL01zXTq4c/maxresdefault.jpg"
        }
        */
      ]
    };
  }
};
</script>

<style>
#test {
  width: 250px;
}
</style>


