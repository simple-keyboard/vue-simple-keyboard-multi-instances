<template>
  <div class="page-view bg-orange" id="signupPage">
    <div class="btnHome" @click="go_home()">
      <img src="../assets/btn_home.png" />
    </div>

    <h1>TITLE</h1>

    <div class="mx-auto" style="width:880px;">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="firstName"
          placeholder="First Name"
          :value="inputs['firstName']"
          @input="onInputChange"
          @focus="onInputFocus"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="lastName"
          placeholder="Last Name"
          :value="inputs['lastName']"
          @input="onInputChange"
          @focus="onInputFocus"
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
          :value="inputs['email']"
          @input="onInputChange"
          @focus="onInputFocus"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="mobile"
          placeholder="Mobile Phone"
          :value="inputs['mobile']"
          @input="onInputChange"
          @focus="onInputFocus"
        />
      </div>
    </div>

    <div style="margin-top:30px;">
      <SimpleKeyboard
        v-if="keyboardClass"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
        :input="inputs[inputName]"
        :inputName="inputName"
        :keyboardClass="keyboardClass"
      />
    </div>
  </div>
</template>

<script>
import SimpleKeyboard from "@/components/SimpleKeyboard.vue";

export default {
  //name: "home-screen",
  components: {
    SimpleKeyboard
  },
  data() {
    return {
      iagree: false,
      //keyboard
      inputs: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: ""
      },
      inputName: "firstName",
      keyboardClass: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted(){
    let randStr = Math.random().toString(36).slice(-5);
    this.keyboardClass = `simple-keyboard-${randStr}`;
    console.log("MOUNTED", this.keyboardClass);
  },
  methods: {
    go_home() {
      this.$router.push({ name: "home" });
    },
    //keyboard
    onChange(input) {
      this.inputs[this.inputName] = input;
    },
    onKeyPress(button) {
      console.log("button", button);
      if (button == "{cancel}") {
        this.go_home();
      } else if (button == "{submit}") {
        console.log("send data..");
        this.go_home();
      }
    },
    onInputChange(input) {
      console.log("Input changed directly:", input.target.id);
      this.inputs[input.target.id] = input.target.value;
    },
    onInputFocus(input) {
      console.log("Focused input:", input.target.id);
      this.inputName = input.target.id;
    }
  }
};
</script>

<style lang="scss" >
@import "../stylesheets/vue-app.scss";

#signupPage {
  .btnHome {
    position: absolute;
  }
  h1 {
    text-align: center;
    font-family: $fontBlack;
    font-size: 36px;
    color: #ffffff;
    padding-top: 105px;
    margin-bottom: 20px;
  }
}
</style>

