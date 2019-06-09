<template>
  <b-container class="overflow-hidden">
    <b-row align-h="center">
      <b-col sm="8" cols="12">
        <b-card class="profile-card">
          <b-container>
            <b-row align-v="center" no-gutters>
              <b-col cols="5">
                <b-img
                  class="profile-pic"
                  :src="sessionData.userinfo.profileimage"
                />
              </b-col>
              <b-col cols="7">
                <p>{{this.sessionData.userinfo.username}}</p>
              </b-col>
            </b-row>
          </b-container>
        </b-card>

        <b-card class="profile-card">
          <b-container>
            <b-row align-v="center" no-gutters>
              <b-col cols="5">
                <strong>Account information</strong>
              </b-col>
              <b-col cols="7">
                <b-link to="/account/updateInformation">Modify account information</b-link>
                <br>
                <b-link to="/account/addressBook">Modify Address Book</b-link>
              </b-col>
            </b-row>
          </b-container>
        </b-card>

        <b-card class="profile-card">
          <b-container>
            <b-row align-v="center" no-gutters>
              <b-col cols="5">
                <strong>Customer Options</strong>
              </b-col>
              <b-col cols="7">
                <b-link to="/account/ordersBought">Orders You've Made</b-link>
                <br>
                <b-link to="/account/reviews">Review History</b-link>
              </b-col>
            </b-row>
            <hr>
            <b-row align-v="center" no-gutters>
              <b-col cols="5">
                <strong>Store Options</strong>
              </b-col>
              <b-col cols="7">
                <b-link to="account/manageStore">Manage inventory</b-link>
                <br>
                <b-link to="/account/ordersSold">Orders You've Sold</b-link>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    sessionData: Object
  },
  methods: {
    profilePic() {
      if (this.sessionData.userinfo.profileimage) {
        return this.sessionData.userinfo.profileimage;
      } else {
        return "https://r.hswstatic.com/w_907/gif/now-af0c66e7-4b34-4f23-ab8d-0506e4f35c5a-1210-680.jpg";
      }
    }
  }
};
</script>


<style>
.profile-pic {
  width: 75%;
}
.profile-card {
  margin: 10px;
}
</style>
