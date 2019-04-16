<!-- TODO
    * add router links to dropdown links + brand
    * shopping cart needs functionality and state
        * show number of items in cart in icon
        * dropdown should show items in cart
    * make search bar work
    * figure out how to get the dropdowns to turn into collapse elements when the screen size is small
    * work out some of the logic?
        * if logged in, then show the account info dropdown
            * if seller or admin, no cart to show
            * if customer, cart will show (and update with saved contents?)
        * if not logged in, show button to signup/login and the cart
-->

<template>
    <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand href="#">Kuma</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <hr />
        <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto"> 
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                </b-nav-form>

                <b-nav-item-dropdown v-if="loggedIn" right>
                <!-- Using 'button-content' slot -->
                    <template slot="button-content">
                        <font-awesome-icon icon="user" /> 
                        <span> Account</span>
                    </template>
                        <b-dropdown-item href="#">My Orders</b-dropdown-item>
                        <b-dropdown-item href="#">Settings</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-button class="my-2" v-else >
                    <font-awesome-icon icon="user" /> 
                        Log In / Sign Up
                </b-button>

                <b-nav-item-dropdown v-if="isCustomer" right>
                <!-- Using 'button-content' slot -->
                    <template slot="button-content">
                        <font-awesome-icon icon="shopping-cart" />
                        <span> Cart</span> 
                    </template>
                    
                    <b-dropdown-item href="#">TODO: put items here</b-dropdown-item>
                    <b-dropdown-item href="#">To Checkout</b-dropdown-item>

                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        props: {
            // shopping cart data, probably
            // a list of keywords to do autocomplete with search bar?
            // authentication status will probably be a prop from the App - also, are you a seller or a customer?
        },
        data: () => {
            return {
                isCustomer: false, // place in props later
                loggedIn: true
            }
        },
        mounted: ()=>{
            // fetch needed data from api
        }
    }

</script>

