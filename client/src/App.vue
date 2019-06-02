<template>
  <div id="app" class="d-flex flex-column sticky-footer-wrapper">
    <Navbar :sessionData="sessionData" @update:sessionData="handleSessionDataUpdate"/>
    <router-view
      :sessionData="sessionData"
      class="flex-fill"
      @update:sessionData="handleSessionDataUpdate"
    />
    <Footer/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Navbar,
    Footer
  },
  data: () => {
    return {
      sessionData: {
        loggedIn: false,
        cart: [],
        userinfo: {
          username: null,
          firstName: null,
          lastName: null,
          email: null,
          isSeller: false,
          user_id: null,
          storesOwned: [],
          profileimage: null
        }
      }
    };
  },
  methods: {
    handleSessionDataUpdate(updates) {
      // preserve sessionData and overwrite only the necessary updates.
      this.sessionData = {
        ...this.sessionData,
        ...updates
      };
    }
  },

  created() {
    // call to the authenticate back end to determine if there is someone currently logged in
    this.$nextTick(() => {
      axios({
        method: "GET",
        url: this.$hostname + "/authenticate"
      })
        .then(res => {
          if (res.status == 200) {
            console.log("someone is logged in");
            // Theres some other information in res.data that we dont need (password, salt, hash etc. so were pulling only what we want)
            let user = res.data;
            this.sessionData.loggedIn = true;
            this.sessionData.userinfo.username = user.username;
            this.sessionData.userinfo.email = user.email;
            this.sessionData.userinfo.firstName = user.firstName;
            this.sessionData.userinfo.lastName = user.lastName;
            this.sessionData.userinfo.address = user.address;
            this.sessionData.userinfo.isSeller = user.isSeller;
            this.sessionData.userinfo.profileimage = user.profile_image;
            this.sessionData.userinfo.storesOwned = user.storesOwned;
            this.sessionData.userinfo.user_id = user._id;
          } else if (res.status == 204) {
            console.log("no one is logged in");
            this.sessionData.loggedIn = false;
            for (let key in this.sessionData.userinfo) {
              this.sessionData.userinfo[key] = null;
            }
          } else {
            console.log("Neither 200 or 204 was recvd");
          }
        })
        .catch(err => {
          //console.log("caught error");
          console.log(err);
        });
    });
    // get previous session's cart, here's a stub for now
    /*this.sessionData.cart.push({
      title: "Cat",
      color: "orange",
      size: null,
      qty: 7,
      unitPrice: 1,
      src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP62KqfVgm2TJgJoVEJoqd2ZGnB2MY6zYaQS13wSE-FS7QsuZS",
      id: 1
    });
    this.sessionData.cart.push({
      title: "Dog",
      color: "corgi",
      size: "baby",
      qty: 2,
      unitPrice: 1,
      src:
        "https://r.hswstatic.com/w_907/gif/now-af0c66e7-4b34-4f23-ab8d-0506e4f35c5a-1210-680.jpg",
      id: 2
    });
    */
    // this needs to be populated from product pages
    this.sessionData.cart.push({
      name: "Intelligent Rubber Salad",
      id: "5cdf4a13da4742097819ab32",
      qty: 4,
      unitPrice: 1,
      image: "http://lorempixel.com/640/480/fashion"
    });
    this.sessionData.cart.push({
      name: "Intelligent Soft Keyboard",
      id: "5cdf4a13da4742097819ab3f",
      qty: 5,
      unitPrice: 2,
      image: "http://lorempixel.com/640/480/nature"
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

body,
.sticky-footer-wrapper {
  min-height: 100vh;
}

.flex-fill {
  flex: 1 1 auto;
}
.title-text {
  margin-top: 20px;
  margin-left: 15px;
}
</style>