<template>
  <v-touch tag="div" id="app" :class="{'debug': is_development}" :style="[scaleStyle]">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      appear
      mode1="out-in"
    >
      <router-view :key="'view_' + $route.params.id" />
    </transition>
  </v-touch>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      scaleStyle: {}
    };
  },
  computed: {
    is_development() {
      return this.$store.state.is_development;
    }
  },
  watch: {},
  created() {
    if (this.$router.currentRoute.name != "home") {
      this.$router.push({ name: "home" });
    }
  },
  mounted() {},
  beforeDestroy: function() {},
  methods: {}
};
</script>

<style lang="scss">
@import "./stylesheets/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";

@import "./stylesheets/vue-app.scss";

/**
 *   MAKE ELECTRON APP FEEL MORE NATIVE
 *
 *   * Prevent dragging all HTML elements, specially:
 *   	- images
 *   	- links (anchors)
 *
 *   * Prevent text selection
 */
*,
*::after,
*::before {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-app-region: no-drag;
  cursor: default;
}
*:focus,
*.focus {
  outline: none !important;
  box-shadow: none !important;
}

body {
  overflow: hidden;
  background-color: rgba($color: #000000, $alpha: 1);
}
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: $fontRegular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: white;
  transition: all 0.3s;

  > div.page-view {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
}

.bg-orange {
  background-color: #ff4b00;
}

.form-group {
  margin-bottom: 12px;
}
.form-control {
  font-size: 32px;
  color: #ffffff;
  background-color: transparent;
  border-radius: 40px;
  border: 2px solid #ffffff;
  padding-left: 40px;
  height: 72px;
}
.form-control:focus {
  background-color: transparent;
  color: #ffffff;
  border-color: #ffffff;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ffffff !important;
  opacity: 1; /* Firefox */
}
</style>
