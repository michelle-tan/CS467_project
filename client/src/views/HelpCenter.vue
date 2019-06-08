<template>
  <div class="container formContainer">
    <b-form ref="form" @submit.prevent="handleSubmit" class="innerFormContainer">
      <h1>Contact us!</h1>
      <hr>
      <br>
      <img
        src="https://www.callcentrehelper.com/images/stories/2010/2016/07/cartoon-headset-760.jpg"
        style="width: 100%;"
      >
      <br>
      <h5
        id="blurb"
      >Send us a message if you need any help with your purchases or concerning your experience with Kuma!</h5>
      <br>
      <hr>
      <h3>User Information</h3>
      <!-- User Information block -->
      <b-card bg-variant="light">
        <!-- First/last name -->
        <b-form-group label="Name:">
          <b-form-input type="text" v-model="formData.firstname" placeholder="First Name" required></b-form-input>
          <div class="padding"></div>
          <b-form-input type="text" v-model="formData.lastname" placeholder="Last Name" required></b-form-input>
        </b-form-group>
        <!-- Email-->
        <b-form-group label="Email:">
          <b-form-input type="text" v-model="formData.email" placeholder="Email Address" required></b-form-input>
          <div class="padding"></div>
          <b-form-input
            type="text"
            v-model="formData.emailrepeat"
            placeholder="Confrim Email Address"
            required
          ></b-form-input>
          <!-- NOTE: I could not get it to display like the registration form -->
          <b-form-valid-feedback :state="validateEmail.isValid">{{validateEmail.message}}</b-form-valid-feedback>
          <b-form-invalid-feedback :state="validateEmail.isValid">{{validateEmail.message}}</b-form-invalid-feedback>
        </b-form-group>
      </b-card>
      <br>

      <h3>Message</h3>
      <b-card bg-variant="light">
        <!-- inquiry type -->
        <b-form-group label="Type of Inquiry:">
          <b-form-select v-model="formData.inquirytype" :options="inquiryoptions" requried></b-form-select>
        </b-form-group>
        <!-- Order Number -->
        <b-form-group label="Order Number (if applicable):">
          <b-form-input type="number" v-model="formData.ordernumber"></b-form-input>
        </b-form-group>
        <b-form-group label="Message:">
          <b-form-textarea
            v-model="formData.message"
            placeholder="Write Something..."
            required
            id="messagearea"
          ></b-form-textarea>
        </b-form-group>
      </b-card>

      <b-button type="submit" variant="primary" class="submitButton">Submit</b-button>

      <!-- testing area
      <div>
        <br>
        <br>
        <h3>Testing data - delete later</h3>
        <p>First Name: {{formData.firstname}}</p>
        <p>Last Name: {{formData.lastname}}</p>
        <p>Email: {{formData.email}}</p>
        <p>Confirm Email: {{formData.emailrepeat}}</p>
        <p>Inquiry Type: {{formData.inquirytype}}</p>
        <p>Order Num: {{formData.ordernumber}}</p>
        <!-- This is for display purposes, the formdata.message will still be one line.  
        Look into nodemailer if there are solutions to make it multiline
        <p style="white-space: pre-line;">Message: {{formData.message}}</p>
      </div>
      -->
      <!-- End testing area -->
    </b-form>
  </div>
</template>

<script>
export default {
  name: "HelpCenter",
  data() {
    return {
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        emailrepeat: "",
        message: "",
        ordernumber: 0,
        inquirytype: null
      },
      inquiryoptions: [
        { value: null, text: "Please select an option" },
        { value: "OrderRelated", text: "Order Related" },
        { value: "Product", text: "Product" },
        { value: "Other", text: "Other" }
      ]
    };
  },
  computed: {
    validateEmail() {
      if (
        this.formData.email &&
        this.formData.email !== this.formData.emailrepeat
      ) {
        return { isValid: false, message: "Email Addresses do not match" };
      } else if (
        this.formData.email &&
        this.formData.email === this.formData.emailrepeat
      ) {
        return { isValid: true, message: "Email Addresses match" };
      }
      return { isValid: false, message: "" };
    }
  },
  methods: {
    handleSubmit() {
      console.log("HELP CENTER FORM SUBMIT");
    }
  }
};
</script>

<style>
.padding {
  padding-top: 0.25em;
}

.formContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.innerFormContainer {
  width: 50%;
}

.submitButton {
  margin-top: 10px;
}

#blurb {
  font-style: italic;
}

#messagearea {
  resize: none;
  height: 225px;
  overflow-y: scroll;
}
</style>