<template>
  <v-layout class="flex-row ">
    <v-card contextual-style="dark" class="p-2 col-3 ml-5">
      <span slot="header">
        Filter
      </span>
      <div slot="body">
        <form @submit.prevent="login(user)">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope fa-fw" />
                </span>
              </div>
              <input
                v-model="user.search"
                type="search"
                placeholder="Search Recipes Titles"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-outline-primary">
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
              @click="handleSelectCuisine(item)"
              class="form-check-input"
              type="radio"
              v-model="selectedCuisine"
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
              @click="handleSelectMealType(item)"
              class="form-check-input"
              type="radio"
              :value="item"
              :id="item"
            />
            <label class="form-check-label" :for="index">
              {{ item }}
            </label>
          </div>

          <div>
            Speical Diet:
          </div>

          <div
            class="form-check form-group form-check-inline"
            v-for="(item, index) in dietOptions"
          >
            <input
              @click="handleSelectDiet(item)"
              class="form-check-input"
              type="radio"
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
        </form>
      </div>
      <div slot="footer">
        <router-link :to="{ name: 'register.index' }">
          Register
        </router-link>
      </div>
    </v-card>

    <v-card contextual-style="dark" class="p-2 col-8">
      <span slot="header">
        All Recipes
      </span>
      <div slot="body" class="flex-wrap justify-content-center d-flex">
        <div v-if="this.selectedCuisineResult.length === 0">
          Start looking for recipes...
        </div>
        <div v-else v-for="(item, index) in this.selectedCuisineResult">
          <div>
            {{ item.title }}
            <img class="m-3" :src="item.image" />
          </div>
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
  mealTypeOptionsArray
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
      user: {
        search: null
      },
      selectedCuisine: null,
      selectedCuisineResult: [],
      cuisineOptions: cuisineOptionsArray,
      selectedDietArray: [],
      dietOptions: dietOptionsArray,
      mealTypeOptions: mealTypeOptionsArray
    };
  },

  /**
   * The methods the page can use.
   */
  methods: {
    /**
     * Will log the user in.
     *
     * @param {Object} user The user to be logged in.
     */
    login(user) {
      this.$store.dispatch("auth/login", user);
    },
    async handleSelectCuisine(selectedCuisine) {
      const result = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=4974bdff0e5c4c27935b0870139d1e92&cuisine=${selectedCuisine}`
      );
      console.log("result", result.data.results);
      console.log(selectedCuisine);
      this.selectedCuisineResult = result.data.results;
    },
    handleSelectDiet(selectedDiet) {
      console.log(selectedDiet);
      this.selectedDietArray.push(selectedDiet);
      console.log(this.selectedDietArray);
    },
    handleSelectMealType(selectedMealType) {
      console.log(selectedMealType);
    }
  }
};
</script>
