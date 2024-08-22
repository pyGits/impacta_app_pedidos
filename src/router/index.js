import Vue from "vue";
import VueRouter from "vue-router";
import ListaProdutoVue from "@/views/Cadastro/Produto/ListaProduto.vue";
import CadastroProdutoVue from "@/views/Cadastro/Produto/CadastroProduto.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/Cadastro/Produto",
    name: "ListaProduto",
    component: ListaProdutoVue,
  },
  {
    path: "/Cadastro/Produto/:id",
    name: "CadastroProduto",
    component: CadastroProdutoVue,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
