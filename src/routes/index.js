/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  // // Home
  // {
  //   path: "/home",
  //   name: "home.index",
  //   component: () => import("@/views/Home/Index.vue"),

  //   // If the user needs to be authenticated to view this page
  //   meta: {
  //     auth: true
  //   }
  // },

  // // Account
  // {
  //   path: "/account",
  //   name: "account.index",
  //   component: () => import("@/views/Account/Index.vue"),

  //   // If the user needs to be authenticated to view this page.
  //   meta: {
  //     auth: true
  //   }
  // },

  // Login
  {
    path: "/",
    name: "filter.index",
    component: () => import("@/views/Filter/Index.vue"),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true
    }
  },

  // Register
  {
    path: "/recipes/:id",
    name: "recipes.index",
    component: () => import("@/views/Recipes/Index.vue"),
    props: true

    // // If the user needs to be a guest to view this page.
    // meta: {
    //   guest: true
    // }
  }
];
