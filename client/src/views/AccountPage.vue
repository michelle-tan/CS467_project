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
                  src="https://r.hswstatic.com/w_907/gif/now-af0c66e7-4b34-4f23-ab8d-0506e4f35c5a-1210-680.jpg"
                />
              </b-col>
              <b-col cols="7">
                <p v-if="sessionData.userinfo.isSeller">{{this.sessionData.userinfo.username}}</p>
                <p v-else>Customer name</p>
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
            <b-row v-if="!sessionData.userinfo.isSeller" align-v="center" no-gutters>
              <b-col cols="5">
                <strong>Purchases</strong>
              </b-col>
              <b-col cols="7">
                <b-link to="/account/orders">Order history</b-link>
                <br>
                <b-link to="/account/reviews">Review History</b-link>
              </b-col>
            </b-row>
            <b-row v-else align-v="center" no-gutters>
              <b-col cols="5">
                <strong>Purchases</strong>
              </b-col>
              <b-col cols="7">
                <b-link to="products/SteveStore">Link to storefront #1</b-link>
                <br>
                <b-link to="products/DomStore">Link to storefront #2</b-link>
                <br>
                <b-link to="account/manageStore">Manage inventory</b-link>
                <br>
                <b-link to="/account/orders">Order history</b-link>
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
  }
};
</script>


<style>
.profile-pic {
  width: 100%;
}
.profile-card {
  margin: 10px;
}
</style>
