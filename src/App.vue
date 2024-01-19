<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "RecipesFinder",

  /**
   * Fires when the app has been mounted.
   */
  mounted() {
    // If the user is authenticated,
    // fetch the data from the API
    if (this.$store.state.auth.authenticated) {
      this.$store.dispatch("account/find");
    }
  }
};
</script>
