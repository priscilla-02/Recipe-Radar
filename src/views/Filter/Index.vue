<template>
  <v-layout class="flex-row ">
    <v-card contextual-style="dark" class="p-2 col-3 ml-5">
      <span slot="header">
        Filter
      </span>
      <div slot="body">
        <form>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope fa-fw" />
                </span>
              </div>
              <input
                v-model="searchTitle"
                type="text"
                placeholder="Search Recipes Titles"
                class="form-control"
                @input="filterRecipesByTitle(searchTitle)"
              />
            </div>
          </div>
          <div class="form-group">
            <button
              class="btn btn-outline-primary"
              @click="searchRecipesByTitle"
            >
              Search
            </button>
          </div>

          <div>
            Cuisine:
          </div>
          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in cuisineOptions"
          >
            <input
              @change="handleSelectCuisine(item)"
              class="form-check-input"
              type="checkbox"
              :value="item"
              :id="item"
            />
            <label class="form-check-label" :for="index">
              {{ item }}
            </label>
          </div>

          <div>
            Meal Type:
          </div>
          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in mealTypeOptions"
          >
            <input
              @change="handleSelectMealType(item)"
              class="form-check-input"
              type="checkbox"
              :value="item"
              :id="item"
            />
            <label class="form-check-label" :for="index">
              {{ item }}
            </label>
          </div>

          <div>
            Special Diet:
          </div>

          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in dietOptions"
          >
            <input
              @change="handleSelectDiet(item)"
              class="form-check-input"
              type="checkbox"
              :value="item"
              :id="item"
            />
            <label class="form-check-label" :for="index">
              {{ item }}
            </label>
          </div>

          <div>
            By Ingredient:
          </div>
          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in ingredientOptions"
          >
            <input
              @change="handleSelectIngredient(item)"
              class="form-check-input"
              type="checkbox"
              :value="item"
              :id="item"
            />
            <label class="form-check-label" :for="index">
              {{ item }}
            </label>
          </div>
        </form>
      </div>
      <div slot="footer">
        <!-- <router-link :to="{ name: 'register.index' }">
          Register
        </router-link> -->
      </div>
    </v-card>

    <v-card contextual-style="dark" class="p-2 col-8">
      <span slot="header">
        All Recipes
      </span>
      <div
        slot="body"
        class="bodySlot d-flex flex-wrap justify-content-center align-items-center fs-6"
      >
        <div
          v-if="selectedRecipesGallery.length === 0 && errorMsg == ''"
          class="text-center"
          style="position: absolute; top: 30%; left: 50%; transform: translate(-30%, -50%); font-size: 24px"
        >
          Start looking for recipes...
        </div>
        <div
          v-else-if="errorMsg !== ''"
          class="text-center"
          style="position: absolute; top: 30%; left: 50%; transform: translate(-30%, -50%); font-size: 24px"
        >
          {{ this.errorMsg }}
        </div>

        <div
          v-else
          class="flex items-center justify-center col-4 flex-wrap border-bottom border-top border-right"
          v-for="(item, index) in selectedRecipesGallery"
          style="height: 290px;"
        >
          <!-- <div v-for="(item, index) in selectedRecipesGallery" :key="index"> -->
          <router-link
            :to="{
              name: 'recipes.index',
              params: { id: item.id, recipe: item }
            }"
            :key="index"
            style="text-decoration: none; color: black;"
          >
            <div class="flex flex-col items-center p-2">
              <!-- <div
                @click="handleSelectSingleRecipe(item.id)"
                class="d-flex flex-column"
              > -->
              <img
                class="m-3 img-fluid "
                style="border-radius: 20px;"
                :src="item.image"
              />
              <div class="text-center mr-3">{{ item.title }}</div>
            </div>
          </router-link>
          <div class="w-100"></div>
          <!-- </div> -->
        </div>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login.
 */

import VLayout from "@/layouts/Minimal.vue";
import VCard from "@/components/Card.vue";
import axios from "axios";
import {
  cuisineOptionsArray,
  dietOptionsArray,
  mealTypeOptionsArray,
  ingredientsOptionsArray
} from "@/constant/constant";

export default {
  /**
   * The name of the page.
   */
  name: "LoginIndex",

  /**
   * The components the page can use.
   */
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
      // user: {
      //   search: null
      // },
      searchTitle: null,
      errorMsg: "",

      selectedRecipesGallery: [],

      cuisineOptions: cuisineOptionsArray,
      selectedCuisineArray: [],

      dietOptions: dietOptionsArray,
      selectedDietArray: [],

      mealTypeOptions: mealTypeOptionsArray,
      selectedMealTypeArray: [],

      ingredientOptions: ingredientsOptionsArray,
      selectedIngredientArray: []
    };
  },

  /**
   * The methods the page can use.
   */
  methods: {
    filterRecipesByTitle(searchTitleInput) {
      this.searchTitle = searchTitleInput;
    },
    async searchRecipesByTitle() {
      const searchQuery = this.searchTitle;

      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&number=12&query=${searchQuery}`
        );
        if (result.data.results.length === 0) {
          this.errorMsg = "No Matching Recipes";
        } else {
          this.selectedRecipesGallery = result.data.results;
          console.log("searchRecipesByTitle", this.selectedRecipesGallery);
        }
        this.searchTitle = null;
      } catch (error) {
        console.error(error);
      }
    },

    async handleSelectCuisine(selectedCuisine) {
      if (this.selectedCuisineArray.includes(selectedCuisine)) {
        this.selectedCuisineArray = this.selectedCuisineArray.filter(
          cuisine => cuisine !== selectedCuisine
        );
      } else {
        this.selectedCuisineArray.push(selectedCuisine);
      }

      console.log(this.selectedCuisineArray.join(","));

      const cuisineQuery = this.selectedCuisineArray.join(",");
      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=7983008ab9b14eb8aba5aa6aee4f5137&cuisine=${cuisineQuery}&number=12`
          // `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&cuisine=${cuisineQuery}&number=12`
        );
        console.log("result", result.data.results);
        console.log("handleSelectCuisine", this.selectedRecipesGallery);
        this.selectedRecipesGallery = result.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    async handleSelectDiet(selectedDiet) {
      if (this.selectedDietArray.includes(selectedDiet)) {
        this.selectedDietArray = this.selectedDietArray.filter(
          diet => diet !== selectedDiet
        );
      } else {
        this.selectedDietArray.push(selectedDiet);
      }
      console.log(this.selectedDietArray);

      const dietQuery = this.selectedDietArray.join(",");

      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&diet=${dietQuery}&number=12`
        );
        console.log("result", result.data.results);
        this.selectedRecipesGallery = result.data.results;
        console.log("handleSelectDiet", this.selectedRecipesGallery);
      } catch (error) {
        console.error(error);
      }
    },
    async handleSelectMealType(selectedMealType) {
      if (this.selectedMealTypeArray.includes(selectedMealType)) {
        this.selectedMealTypeArray = this.selectedMealTypeArray.filter(
          mealType => mealType !== selectedMealType
        );
      } else {
        this.selectedMealTypeArray.push(selectedMealType);
      }
      console.log(this.selectedMealTypeArray);

      const mealTypeQuery = this.selectedMealTypeArray.join(",");
      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&mealType=${mealTypeQuery}&number=12`
        );
        console.log("result", result.data.results);
        this.selectedRecipesGallery = result.data.results;
        console.log("handleSelectMealType", this.selectedRecipesGallery);
      } catch (error) {
        console.error(error);
      }
    },
    async handleSelectIngredient(selectedIngredient) {
      if (this.selectedIngredientArray.includes(selectedIngredient)) {
        this.selectedIngredientArray = this.selectedIngredientArray.filter(
          ingredient => ingredient !== selectedIngredient
        );
      } else {
        this.selectedIngredientArray.push(selectedIngredient);
      }
      console.log(this.selectedIngredientArray);
      const ingredientQuery = this.selectedIngredientArray.join(",");
      console.log(ingredientQuery);
      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&includeIngredients=${ingredientQuery}&number=12`
        );
        console.log("result", result.data.results);
        this.selectedRecipesGallery = result.data.results;
        console.log("handleSelectIngredient", this.selectedRecipesGallery);
      } catch (error) {
        console.error(error);
      }
    }

    // async handleSelectSingleRecipe(recipeId) {
    //   try {
    //     const result = await axios.get(
    //       `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=4974bdff0e5c4c27935b0870139d1e92`
    //     );
    //     this.selectedRecipesGallery = result.data;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }
};
</script>
