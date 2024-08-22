import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

// Importando Bootstrap e BootstrapVue
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import Toasted from "vue-toasted";

// Configurando o BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin); // Opcional: para usar ícones do BootstrapVue
Vue.use(Toasted, { duration: 5000 });

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
