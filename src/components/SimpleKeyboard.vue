<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    },
    inputName: {
      type: String
    }
  },
  data() {
    return {
      keyboard: null
    };
  },
  created() {
    // console.log(this.input); //value
    // console.log(this.inputName); //input field
  },
  mounted() {
    //console.log("sk1", this.keyboard);
    setTimeout(() => {}, 1000);

    this.keyboard = new Keyboard(`.${this.keyboardClass}`, {
      debug: true,
      //
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      inputName: this.inputName,
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      //syncInstanceInputs: true,
      //https://franciscohodge.com/projects/simple-keyboard/documentation/
      layout: {
        default: [
          "1 2 3 4 5 6 7 8 9 0 - _ {bksp}",
          "q w e r t y u i o p @",
          "a s d f g h j k l ' .com",
          "{shift} z x c v b n m , .",
          "{cancel} {space} {submit}"
        ],
        shift: [
          "1 2 3 4 5 6 7 8 9 0 - _ {bksp}",
          "Q W E R T Y U I O P @",
          "A S D F G H J K L ' .com",
          "{shift} Z X C V B N M , .",
          "{cancel} {space} {submit}"
        ]
      },
      mergeDisplay: true,
      display: {
        "{cancel}": "Cancel",
        "{submit}": "Submit"
      },
      buttonTheme: [
        {
          class: "hg-oval",
          buttons: "{cancel}"
        },
        {
          class: "hg-oval hg-submit",
          buttons: "{submit}"
        },
        {
          class: "hg-longspace",
          buttons: "{space}"
        }
      ]
    });

    //console.log("sk2", this.keyboard);

    //console.log(this.keyboard.getOptions());
    //this.keyboard.keyboardDOM.classList.add("show-keyboard");
  },
  beforeDestroy() {
    this.keyboard.destroy();
    this.keyboard = null;
  },
  methods: {
    showKeyboard() {
      this.keyboard.keyboardDOM.classList.add("show-keyboard");
    },
    hideKeyboard() {
      this.keyboard.keyboardDOM.classList.remove("show-keyboard");
    },

    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
  },
  watch: {
    inputName(inputName) {
      console.log("SimpleKeyboard: inputName updated", inputName);
      this.keyboard.setOptions({ inputName });
    },
    input(input) {
      console.log(
        "SimpleKeyboard: input Updated",
        this.keyboard.options.inputName,
        input
      );
      this.keyboard.setInput(input);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../stylesheets/vue-app.scss";
.simple-keyboard.hg-theme-default {
  background-color: unset;
  padding: 0;
}
.simple-keyboard {
  max-width: 1150px;
  margin: auto;
  font-family: $fontRegular;
  color: #ffffff;
}
.simple-keyboard.hg-theme-default .hg-button {
  height: 70px !important;
  font-size: 30px;
  border: 2px solid #ffffff;
  background: transparent;
  border-radius: 12px;
}
.simple-keyboard.hg-theme-default .hg-button.hg-oval {
  border-radius: 40px;
}
.simple-keyboard.hg-theme-default .hg-button.hg-submit {
  background: #ffffff;
  color: #ff4b00;
}
.simple-keyboard.hg-theme-default .hg-button.hg-longspace {
  width: 300px;
}
</style>