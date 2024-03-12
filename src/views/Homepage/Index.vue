<template>
  <v-layout class="flex-row" id="custom-font">
    <v-card
      contextual-style="light"
      class="p-2 col-3 ml-5"
      style="background-color: #9CAF88"
    >
      <h1 slot="header" style="color: #9CAF88;" class="text-center">
        Filter
      </h1>
      <div slot="body">
        <form>
          <div
            class="d-flex flex-column 
       "
          >
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend"></div>
                <input
                  v-model="searchTitle"
                  type="text"
                  placeholder="Recipe Name"
                  class="form-control"
                  style="font-size: 25px"
                  @input="filterRecipesByTitle(searchTitle)"
                />
              </div>
            </div>

            <div class="d-flex justify-content-start">
              <button
                class="btn btn-outline-secondary btn-light"
                style="font-size: 25px;"
                @click="searchRecipesByTitle"
              >
                Search
                <i class="bi bi-search-heart"></i>
              </button>
            </div>
          </div>

          <div class="pt-5" style="font-size: 50px; text-decoration: underline">
            Cuisine:
          </div>
          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in cuisineOptions"
          >
            <input
              @change="handleSelectCuisine(item)"
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="item"
              :id="item"
            />
            <label class="form-check-label" :for="index">
              {{ item }}
            </label>
          </div>

          <div
            class="pt-5"
            style="font-size: 50px; text-decoration: underline;"
          >
            Meal Type:
          </div>
          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in mealTypeOptions"
          >
            <input
              @change="handleSelectMealType(item)"
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="item"
              :id="item"
            />
            <label class="form-check-label" :for="index">
              {{ item }}
            </label>
          </div>

          <div class="pt-5" style="font-size: 50px; text-decoration: underline">
            Special Diet:
          </div>

          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in dietOptions"
          >
            <input
              @change="handleSelectDiet(item)"
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="item"
              :id="item"
            />
            <label class="form-check-label" :for="index">
              {{ item }}
            </label>
          </div>

          <div class="pt-5" style="font-size: 50px; text-decoration: underline">
            By Ingredient:
          </div>
          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in ingredientOptions"
          >
            <input
              @change="handleSelectIngredient(item)"
              class="form-check-input custom-checkbox"
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
      <div slot="footer"></div>
    </v-card>

    <v-card
      contextual-style="light"
      class="p-2 col-8"
      style="background-color: #9CAF88"
    >
      <h1 slot="header" style="color: #9CAF88;" class="text-center">
        All Recipes
      </h1>

      <div
        slot="body"
        class="bodySlot d-flex flex-wrap justify-content-start align-items-center"
      >
        <div
          v-if="selectedRecipesGallery.length === 0 && errorMsg == ''"
          id="message-content"
          class="text-center text-white w-100"
        >
          <div style="font-size: 70px">
            Start looking for recipes...
            <span id="custom-icon">GL</span>
          </div>
        </div>
        <div
          v-else-if="errorMsg !== ''"
          style="color: white; justify-content: center; align-items: center; text-align: center; width: 100%;"
          id="message-content"
        >
          <h1>{{ this.errorMsg }}</h1>
        </div>

        <div
          v-else
          class="flex items-center justify-center col-4 flex-wrap"
          style="height: 420px;"
          :class="getClass(index, selectedRecipesGallery.length)"
          v-for="(item, index) in selectedRecipesGallery"
          :key="index"
        >
          <router-link
            :to="{
              name: 'singleRecipes.index',
              params: { id: item.id, recipe: item }
            }"
            :key="index"
            style="text-decoration: none;"
          >
            <div class="flex flex-col items-center px-2 pt-2 pb-4">
              <img
                class="mx-auto my-3 img-fluid text-center"
                style="border-radius: 20px; display:block;"
                :src="item.image"
              />
              <div class="text-center mr-3 pt-3 pb-5 text-white">
                {{ item.title }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </v-card>
  </v-layout>
</template>

<style>
@media (max-width: 1199px) {
  #message-content {
    padding-top: 150px;
  }
}

@media (min-width: 1200px) {
  #message-content {
    padding-top: 350px;
  }
}

@font-face {
  font-family: "Kitchen Restaurant";
  src: url("../../../font/Kitchen Restaurant.otf") format("woff2");
}

#custom-font {
  font-family: "Kitchen Restaurant", sans-serif;
  font-size: 38px;
  color: white;
}

@font-face {
  font-family: "DJ Kitchen";
  src: url("../../../font/DJ_Kitchen.ttf") format("woff2");
}

#custom-icon {
  font-family: "DJ Kitchen", sans-serif;
  font-size: 60px;
  color: white;
}

.custom-checkbox {
  width: 0.6em;
  height: 0.6em;
  border-radius: 50%;
}
</style>

<script>
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
  name: "HomepageIndex",

  components: {
    VLayout,
    VCard
  },

  data() {
    return {
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

  methods: {
    filterRecipesByTitle(searchTitleInput) {
      this.searchTitle = searchTitleInput;
    },

    getClass(index, arrayLength) {
      const isLastInRow = (index + 1) % 3 === 0;
      const isLastRow = index >= arrayLength - (arrayLength % 3);

      if (isLastRow) {
        return "";
      } else if (isLastInRow) {
        return "border-bottom";
      } else {
        return "border-right border-bottom";
      }
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
      const cuisineQuery = this.selectedCuisineArray.join(",");
      try {
        const result = await axios.get(
          // `https://api.spoonacular.com/recipes/complexSearch?apiKey=7983008ab9b14eb8aba5aa6aee4f5137&cuisine=${cuisineQuery}&number=12`
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&cuisine=${cuisineQuery}&number=12`
        );
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

      const dietQuery = this.selectedDietArray.join(",");

      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&diet=${dietQuery}&number=12`
        );
        this.selectedRecipesGallery = result.data.results;
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

      const mealTypeQuery = this.selectedMealTypeArray.join(",");
      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&mealType=${mealTypeQuery}&number=12`
        );
        this.selectedRecipesGallery = result.data.results;
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
      const ingredientQuery = this.selectedIngredientArray.join(",");
      try {
        const result = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&includeIngredients=${ingredientQuery}&number=12`
        );
        this.selectedRecipesGallery = result.data.results;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
