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

    NOTE:
        * This component contains the authentication modal
        * Will probably contain the shopping cart component as well
        (Subject to change, but I feel like making them direct children of App would complicate App's state?)
-->

<template>
    <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand href="#">Kuma</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <hr />

       

        <!-- Searchbar -->
            <b-navbar-nav class="ml-auto"> 
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                </b-nav-form>
                
<!-- Links -->
            <b-navbar-nav class="my-auto">
                <b-nav-item href="#">About Kuma</b-nav-item>
                <b-nav-item href="#">Selling on Kuma</b-nav-item>
            </b-navbar-nav>

        <!-- Account Info Dropdown -->
                <b-nav-item-dropdown v-if="loggedIn" right>
                    <template slot="button-content">
                        <font-awesome-icon icon="user" /> 
                        <span> Account</span>
                    </template>
                        <b-dropdown-item href="#">My Orders</b-dropdown-item>
                        <b-dropdown-item href="#">Settings</b-dropdown-item>
                        <b-dropdown-item href="#">Log Out</b-dropdown-item>
                </b-nav-item-dropdown>

       <!-- Login / Signup button and modal (render if not logged in) -->
                <div v-else>
                    <b-button class="my-2" v-b-modal.authModal>
                        <font-awesome-icon icon="user" /> 
                            Log In / Sign Up
                    </b-button>
                    <b-modal 
                        id="authModal"
                        centered 
                        @ok.prevent="getFormData"
                    >
                        <!--Modal title changes whether logging in or registering -->
                        <div v-if="showingLogin" slot="modal-title">
                            Log In or 
                            <b-link @click.prevent="toggleForm">
                                Register
                            </b-link>
                        </div>
                        <div v-else slot="modal-title"> 
                            <b-link @click.prevent="toggleForm">
                                Log In
                            </b-link>
                            or Register
                        </div>

                        <!-- Version of UserInfoForm shown is bound to value of this.showingLogin -->
                        <LoginForm v-show="showingLogin" @logged-in="loggedIn=true"/>
                        <RegistrationForm v-show="!showingLogin" @logged-in="loggedIn=true"/>

                        <!-- remove default buttons from modal -->
                        <div slot="modal-footer" />
                    </b-modal>
                </div>


       <!-- Cart Icon (if customer or not logged in) -->
                <b-nav-item-dropdown class="my-auto" v-if="isCustomer" right>
                    <template slot="button-content">
                        <font-awesome-icon icon="shopping-cart" />
                        <span> Cart</span> 
                    </template>
                    <b-dropdown-item href="#">TODO: put items here</b-dropdown-item>
                    <b-dropdown-item href="#">
                        <b-button>View Cart and Checkout</b-button>
                    </b-dropdown-item>


                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>

    import LoginForm from './LoginForm.vue'
    import RegistrationForm from './RegistrationForm.vue'

    export default {
        components: {
            LoginForm,
            RegistrationForm
        },
        props: {
            // shopping cart data, probably
            // a list of keywords to do autocomplete with search bar?
            // authentication status will probably be a prop from the App 
                //- also, are you a seller or a customer?
        },
        data: () => {
            return {
                isCustomer: true,
                loggedIn: false,
                // ^^ place these two in props later
                showModal: false,
                showingLogin: true
            }
        },
        mounted: ()=>{
            // fetch needed data from api
        },
        methods:{
            toggleForm(){
                if(this.showingLogin){
                    this.showingLogin = false
                }
                else{
                    this.showingLogin = true
                }
            }
        },
 
    }

</script>

