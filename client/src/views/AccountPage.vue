<template>
    <b-container class="overflow-hidden">
        <b-row align-h="center">
            <b-col sm="8" cols="12" >
                <b-card class="profile-card">
                <b-container>
                    <b-row align-v="center" no-gutters>
                        <b-col cols="5">
                            <b-img class="profile-pic" src="https://r.hswstatic.com/w_907/gif/now-af0c66e7-4b34-4f23-ab8d-0506e4f35c5a-1210-680.jpg" />
                        </b-col>
                        <b-col cols="7">
                            <p v-if="userData.isSeller">Seller name</p>
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
                                <b-link href="/account/updateInformation">Modify account information</b-link>
                                <br>
                                <b-link href="/account/addressBook">Modify Address Book</b-link>
                            </b-col>
                        </b-row>
                    </b-container> 
                </b-card>

                <b-card class="profile-card"> 
                    <b-container>
                        <b-row v-if="!userData.isSeller" align-v="center" no-gutters>
                            <b-col cols="5">
                                <strong>Purchases</strong>
                            </b-col>
                            <b-col cols="7">
                                <b-link>Order history</b-link>
                                <br>
                                <b-link>Review History</b-link>
                            </b-col>
                        </b-row>
                        <b-row v-else align-v="center" no-gutters>
                            <b-col cols="5">
                                <strong>Purchases</strong>
                            </b-col>
                            <b-col cols="7">
                                <b-link>Link to storefront</b-link>
                                <br>
                                <b-link>Manage inventory</b-link>
                                <br>
                                <b-link>Order history</b-link>
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
    props:{
        userData: Object
    }
}
</script>


<style>
.profile-pic{
    width: 100%;
}
.profile-card{
    margin: 10px;
}
</style>
