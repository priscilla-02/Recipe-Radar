import Vue from "vue";

import "./plugins/vuex";
import "./plugins/axios";
import { router } from "./plugins/vue-router";
import "./plugins/vuex-router-sync";
import "./plugins/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

store.dispatch("auth/check");

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App)
});
