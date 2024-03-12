/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  {
    path: "/",
    name: "homepage.index",
    component: () => import("@/views/Homepage/Index.vue")
  },
  {
    path: "/recipes/:id",
    name: "singleRecipes.index",
    component: () => import("@/views/SingleRecipes/Index.vue"),
    props: true
  }
];
