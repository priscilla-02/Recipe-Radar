<template>
  <v-layout>
    <v-card contextual-style="light" id="custom-font">
      <div slot="body" style="color: white; background-color: #9CAF88">
        <button
          class="btn btn-outline-secondary btn-light mx-3 my-3"
          style="font-size: 30px; border-radius:20px"
          @click="$router.go(-1)"
        >
          <i class="bi bi-backspace-fill ml-2"></i>
          <span class="ml-2 mr-3">Back</span>
        </button>
        <div class="text-center">
          <div>
            <h1 class="py-5" style="font-size: 60px;">
              {{ recipe.title }}
            </h1>
          </div>
          <div>
            <img
              class="border border-5"
              style="border-radius:30px; height:300px"
              :src="recipe.image"
            />
          </div>
          <div class="pt-3">Cooking time: {{ recipe.readyInMinutes }} mins</div>
          <div class="pt-2 pb-5">Serving: {{ recipe.servings }}</div>
        </div>

        <div style="padding: 0 150px;">
          <div v-html="sanitizeHTML(recipe.summary)"></div>
        </div>

        <br />
        <div style="padding: 0 150px;">
          <h2 style="font-size: 60px;" class="py-5">
            Instructions:
          </h2>
          <div v-for="(step, index) in this.recipeStep" :key="index">
            <p>
              <strong style="font-size: 50px">Step {{ step.number }}:</strong>
              {{ step.step }}
            </p>
            <br />
          </div>
        </div>
        <br />
      </div>
    </v-card>
  </v-layout>
</template>

<style>
@font-face {
  font-family: "Kitchen Restaurant";
  src: url("../../../font/Kitchen Restaurant.otf") format("woff2");
}

#custom-font {
  font-family: "Kitchen Restaurant", sans-serif;
  font-size: 38px;
  color: white;
}
</style>

<script>
import VLayout from "@/layouts/Minimal.vue";
import VCard from "@/components/Card.vue";
import axios from "axios";

export default {
  name: "SingleRecipesIndex",
  components: {
    VLayout,
    VCard
  },

  data() {
    return {
      recipe: null,
      recipeStep: []
    };
  },

  async created() {
    this.recipe = this.$route.params.recipe;

    const result = await axios.get(
      // `https://api.spoonacular.com/recipes/${this.recipe.id}/information?apiKey=7983008ab9b14eb8aba5aa6aee4f5137`
      `https://api.spoonacular.com/recipes/${this.recipe.id}/information?apiKey=4974bdff0e5c4c27935b0870139d1e92`
    );
    this.recipe = result.data;
    this.recipeStep = result.data.analyzedInstructions[0].steps;
  },

  methods: {
    sanitizeHTML(html) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    }
  }
};
</script>
