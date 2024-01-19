<template>
  <v-layout>
    <v-card contextual-style="dark"> </v-card>
  </v-layout>
</template>

<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

import VLayout from "@/layouts/Default.vue";
import VCard from "@/components/Card.vue";

export default {
  /**
   * The name of the page.
   */
  name: "HomeIndex",

  /**
   * The components that the page can use.
   */
  components: {
    VLayout,
    VCard
  }
};
</script>
