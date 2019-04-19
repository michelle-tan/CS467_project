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
        <b-navbar-toggle class="order-1 mr-4" target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand class="order-2" href="#">Kuma</b-navbar-brand>

        <b-collapse class="order-4 order-sm-3" id="nav-collapse" is-nav>
            <hr />

        <!-- Searchbar -->
            <b-navbar-nav> 
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
            </b-navbar-nav>
        </b-collapse>
 
        <b-navbar-nav class="order-3 order-sm-4">

               <!-- Cart Icon (if customer or not logged in) -->
            <b-dropdown class="ml-2" v-if="isCustomer" right>
                <template slot="button-content">
                    <font-awesome-icon icon="shopping-cart" />
                    <span> Cart</span> 
                    <span v-if="cart.length"> ( {{ cart.length }} ) </span>
                </template>

                <b-dropdown-header class="cart-dropdown">
                    Your Cart:
                </b-dropdown-header>

                <b-dropdown-text>
                    <ShoppingCart :items="cart"/>
                </b-dropdown-text>

                <b-dropdown-text>
                    Subtotal: {{ calcSubtotal }}
                </b-dropdown-text>

                <b-dropdown-item href="#">
                    <b-button>View Cart and Checkout</b-button>
                </b-dropdown-item>
            </b-dropdown>

        </b-navbar-nav>

    </b-navbar>
</template>

<script>

    import LoginForm from './LoginForm.vue'
    import RegistrationForm from './RegistrationForm.vue'
    import ShoppingCart from './ShoppingCart.vue'

    export default {
        components: {
            LoginForm,
            RegistrationForm,
            ShoppingCart
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
                showingLogin: true,
                cart: [
                    {
                        title: "Cat",
                        color: "orange",
                        qty: 7,
                        unitPrice: 1,
                        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP62KqfVgm2TJgJoVEJoqd2ZGnB2MY6zYaQS13wSE-FS7QsuZS",
                        id: 1
                    },
                                        {
                        title: "Dog",
                        color: "corgi",
                        qty: 2,
                        unitPrice: 1,
                        src: "https://r.hswstatic.com/w_907/gif/now-af0c66e7-4b34-4f23-ab8d-0506e4f35c5a-1210-680.jpg",
                        id: 2
                    },
                ] // make a prop someday 

            }
        },
        mounted: function(){
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
        computed: {
            calcSubtotal(){
                var subtotal = 0
                for(var item in this.cart){
                    subtotal += (this.cart[item].unitPrice * this.cart[item].qty);
                }
                return subtotal
            }
        }

 
    }

</script>

<style>

.cart-dropdown{
    width: 21rem;
}
</style>

