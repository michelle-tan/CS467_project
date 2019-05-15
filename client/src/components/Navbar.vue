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
        <b-navbar-toggle class="order-1 mr-4 toggle" target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand class="order-2" @click.native="collapseIsVisible = false" to="/" >Kuma</b-navbar-brand>
        <b-collapse class="order-4 order-sm-3" id="nav-collapse" is-nav v-model="collapseIsVisible">
            <hr />
            <!-- Searchbar -->
            <b-navbar-nav> 
                <b-nav-form>
                    <b-form-input 
                        @keydown.native="handleSearch" 
                        size="sm" class="mr-sm-2" 
                        placeholder="Search" 
                        v-model="searchString">
                    </b-form-input>
                </b-nav-form>
                
            <!-- Links -->
            <b-navbar-nav class="my-auto">
                <b-nav-item to="/test" >About Kuma</b-nav-item>
                <b-nav-item to="/createstore" @click.native="collapseIsVisible = false">Sell on Kuma</b-nav-item>
            </b-navbar-nav>

                <!-- Account Info Dropdown -->
                <b-nav-item-dropdown v-if="sessionData.loggedIn" right>
                    <template slot="button-content">
                        <font-awesome-icon icon="user" /> 
                        <span> {{sessionData.userinfo.username}}</span>
                        
                    </template>
                        <b-dropdown-item to="/account">Account</b-dropdown-item>
                        <b-dropdown-item to="#" @click.prevent="logout">Log Out</b-dropdown-item>
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
                        v-model="showModal"
                    >

                         <!--Modal title changes whether logging in or registering -->
                        <div v-if="showingLoginForm" slot="modal-title">
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

                          <!-- Version of UserInfoForm shown is bound to value of this.showingLoginForm -->
                        <LoginForm 
                            v-show="showingLoginForm" 
                            @logged-in="onLogin"
                            :showFailure = "!showModal"
                            :sessionData = "sessionData"
                            
                        />

                        <RegistrationForm 
                            v-show="!showingLoginForm" 
                            @logged-in="onLogin"
                            :showFailure = "!showModal"
                            :sessionData = "sessionData"
                        />

                           <!-- removes default buttons from modal -->
                        <div slot="modal-footer" />
                    </b-modal>
                </div>
            </b-navbar-nav>
        </b-collapse>
 
        <b-navbar-nav class="order-3 order-sm-4">

            <!-- Cart Icon (if customer or not logged in) -->
            <b-dropdown id="cart-dropdown" class="ml-2" v-if="!sessionData.userinfo.isSeller" right>
                <template slot="button-content">
                    <font-awesome-icon icon="shopping-cart" />
                    <span> Cart</span> 
                    <span v-if="sessionData.cart.length"> ( {{ sessionData.cart.length }} ) </span>
                </template>

                <b-dropdown-header class="cart-dropdown">
                    Your Cart:
                </b-dropdown-header>

                <b-dropdown-text v-if="sessionData.cart.length">
                    <ShoppingCart :items="sessionData.cart"/>
                </b-dropdown-text>

                <b-dropdown-text v-else>
                    <p>Your cart is empty!</p>
                </b-dropdown-text>

                <b-dropdown-text>
                    <div class="text-center" > 
                        Subtotal: $&nbsp;{{ calcSubtotal }}
                    </div>
                </b-dropdown-text>

                <b-dropdown-item-button >
                   <div class="text-center" > <b-button to="/cart"> View Cart and Checkout </b-button> </div>
                </b-dropdown-item-button>
            </b-dropdown>

        </b-navbar-nav>

    </b-navbar>
</template>

<script>

    import LoginForm from './LoginForm.vue'
    import RegistrationForm from './RegistrationForm.vue'
    import ShoppingCart from './ShoppingCart.vue'
    import Axios from 'axios';
    

    export default {
        components: {
            LoginForm,
            RegistrationForm,
            ShoppingCart
        },

        props: {
            sessionData: Object
        },

        data: () => {
            return {
                showModal: false,
                showingLoginForm: true,
                searchString: '',
                collapseIsVisible: false
            }
        },

        methods:{
            toggleForm(){
                if(this.showingLoginForm){
                    this.showingLoginForm = false
                }
                else{
                    this.showingLoginForm = true
                }
            },
            handleSearch(event){
                //if keydown was enterkey
                if(event.which === 13){
                    event.preventDefault()
                    // seems this encodes the querystring VV
                    // TODO update the path here
                    this.$router.push('/?search=' + this.searchString)
                    this.searchString = ""
                }
            },
            logout:function(){
                Axios({
                    method: 'Get',
                    url: this.$hostname + '/logout'
                }).then(response=>{
                    if(response.status===200){
                        this.sessionData.loggedIn = false;
                        this.info = response
                   //     this.$router.push('/');
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },

            // use this to propagate changes up to App
            onLogin(value) {
                console.log(value);
                this.showModal = false;
                this.$emit("update:sessionData", {
                    loggedIn: true, 
                    userinfo: {
                        ...this.sessionData.userinfo,
                        ...value
                        }
                    }
                );
            }
        },

        computed: {
            calcSubtotal(){
                var subtotal = 0
                for(var item in this.sessionData.cart){
                    subtotal += (this.sessionData.cart[item].unitPrice * this.sessionData.cart[item].qty);
                }
                return subtotal.toFixed(2)
            }
        }

 
    }

</script>

<style>

.cart-dropdown{
    width: 21rem;
}
</style>

