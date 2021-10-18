import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Router from "vue-router";
import Dis from "./components/dis.vue";
import Toplist from "./components/toplist.vue";
import MV from "./components/mv.vue"
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/dis",
    },
    {
      path: "/dis",
      component: Dis,
    },
    {
      path: "/toplist",
      component: Toplist,
    },
    {
      path: "/mv",
      component: MV
    }
  ],
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
