<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header"> {{ recipe.title }}</span>
      <div slot="body">
        <div>
          {{ recipe.title }}
        </div>
        <div>
          <img :src="recipe.image" />
        </div>
        <div>Cooking time: {{ recipe.readyInMinutes }}</div>
        <div>Serving: {{ recipe.servings }}</div>

        <br />
        <div>
          Summary:
          <div v-html="sanitizeHTML(recipe.summary)"></div>
        </div>
        <br />

        <br />
        <div>
          Instructions:
          <div
            v-for="(step, index) in recipe.analyzedInstructions[0].steps"
            :key="index"
          >
            <p>
              <strong>Step {{ step.number }}:</strong> {{ step.step }}
            </p>
          </div>
        </div>
        <br />
      </div>
    </v-card>
  </v-layout>
</template>

<script>
import VLayout from "@/layouts/Minimal.vue";
import VCard from "@/components/Card.vue";
import axios from "axios";

export default {
  name: "RecipesIndex",
  components: {
    VLayout,
    VCard
  },

  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      recipe: null
    };
  },

  async created() {
    this.recipe = this.$route.params.recipe;

    const result = await axios.get(
      `https://api.spoonacular.com/recipes/${this.recipe.id}/information?apiKey=7983008ab9b14eb8aba5aa6aee4f5137`
    );
    console.log("result in single recipe", result.data);
    this.recipe = result.data;
    console.log("title", this.recipe.title);
    console.log("ready", this.recipe.readyInMinutes);
    console.log("servings", this.recipe.servings);
    console.log("image", this.recipe.image);
    console.log("summary", this.recipe.summary);
    console.log("instructions", this.recipe.instructions);
    console.log(
      "analyzed instructions",
      this.recipe.analyzedInstructions[0].steps[0].number
    );
  },

  methods: {
    sanitizeHTML(html) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    }
  }
};
</script>
