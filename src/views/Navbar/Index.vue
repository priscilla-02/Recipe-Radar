<template>
  <header
    slot="header"
    class="d-flex align-items-center justify-content-center p-4"
  >
    <div class="text-center" id="navbar-header">Recipes Radar</div>
  </header>
</template>

<style>
@font-face {
  font-family: "Kitchen Kapers";
  src: url("../../../font/Kitchen Kapers 2.ttf") format("woff2");
}

#navbar-header {
  font-family: "Kitchen Kapers", sans-serif;
  font-size: 110px;
  color: #9caf88;
}

@media (max-width: 768px) {
  #navbar-header {
    font-size: 80px;
  }
}
</style>

<script>
import VLayout from "@/layouts/Minimal.vue";
import VCard from "@/components/Card.vue";

export default {
  name: "Navbar",
  components: {
    VLayout,
    VCard
  }
};
</script>
