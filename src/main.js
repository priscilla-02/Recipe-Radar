import Vue from "vue";

import "./plugins/vuex";
import "./plugins/axios";
import { i18n } from "./plugins/vue-i18n";
import { router } from "./plugins/vue-router";
import "./plugins/vuex-router-sync";
import "./plugins/bootstrap";
import "./plugins/font-awesome";
import "./plugins/register-service-worker";

import "./assets/stylus/app.styl";

import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

store.dispatch("auth/check");

/* eslint-disable no-new */
new Vue({
  /**
   * Bind the Vue instance to the HTML.
   */
  el: "#app",

  /**
   * The localization plugin.
   */
  i18n,

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App)
});
