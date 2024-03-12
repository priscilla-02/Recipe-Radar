<template>
  <div class="column">
    <Navbar />
    <div class="row">
      <slot />
    </div>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar/Index.vue";
export default {
  name: "MinimalLayout",
  components: {
    Navbar // Register the Navbar component
  }
};
</script>
