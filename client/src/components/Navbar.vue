<!-- TODO
    * add router links
    * shopping cart needs functionality and state
        * show number of items in cart in icon
        * dropdown should show items in cart
    * figure out how to get the dropdowns to turn into collapse elements when the screen size is small
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

                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                    <template slot="button-content">
                        <font-awesome-icon icon="user" /> 
                        <span> Account</span>
                    </template>
            
                    <b-dropdown-item href="#">My Orders</b-dropdown-item>
                    <b-dropdown-item href="#">Settings</b-dropdown-item>

                </b-nav-item-dropdown>

                <b-nav-item-dropdown right>
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



