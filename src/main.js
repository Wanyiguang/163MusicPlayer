import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store.js";
import Router from "vue-router";

import Dis from "./components/dis.vue";
import MV from "./components/mv.vue";
import List from "./components/list.vue";
import New from "./components/new.vue";
import Result from "./components/result.vue";
import Playlist from "./components/playlist.vue";

Vue.config.productionTip = false;
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
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
      path: "/mv",
      component: MV,
    },
    {
      path: "/list",
      component: List,
    },
    {
      path: "/new",
      component: New,
    },
    {
      path: "/result",
      component: Result,
    },
    {
      path: "/playlist",
      component: Playlist,
    },
  ],
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
