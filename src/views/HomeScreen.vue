<template>
  <div class="page-view" id="homepage">
    <h1>home page</h1>
    <button class="btn btn-primary m-5" @click="open_signup()">sign up</button>
  </div>
</template>

<script>
export default {
  //name: "home-screen",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    open_signup() {
      this.$router.push({ name: "signup" });
    }
  }
};
</script>

<style lang="scss">
@import "../stylesheets/vue-app.scss";
#homepage {
  background-color: #ffffff;
}
</style>

