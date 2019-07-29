import Vue from "vue";
import Router from "vue-router";
import Calculator from "../components/Calculator";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Calculator",
      component: Calculator
    }
  ]
});
