import Vue from "vue";
import VueRouter from "vue-router";
import ListaProdutoVue from "@/views/Cadastro/Produto/ListaProduto.vue";
import CadastroProdutoVue from "@/views/Cadastro/Produto/CadastroProduto.vue";
import ListaCliente from "@/views/Cadastro/Cliente/ListaCliente.vue";
import CadastroCliente from "@/views/Cadastro/Cliente/CadastroCliente.vue";
import Login from "@/views/Login/Login.vue";
import Register from "@/views/Login/Register.vue";
import CriarPedido from "@/views/Pedido/CriarPedido.vue";
import ListarPedido from "@/views/Cadastro/Pedido/ListarPedido.vue";
import EditarPedido from "@/views/Cadastro/Pedido/EditarPedido.vue";
import Geral from "@/views/Configuracoes/Geral.vue";
import CadastroEntregador from "@/views/Cadastro/Entregador/CadastroEntregador.vue";
import ListaEntregador from "@/views/Cadastro/Entregador/ListaEntregador.vue";
import ConsultarPedido from "@/views/Pedido/ConsultarPedido.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/cadastro",
    component: Register,
  },
  {
    path: "/Cadastro/Produto",
    name: "ListaProduto",
    component: ListaProdutoVue,
    meta: { requiresAuth: true },
  },
  {
    path: "/Cadastro/Entregador",
    name: "ListaEntregador",
    component: ListaEntregador,
    meta: { requiresAuth: true },
  },
  {
    path: "/Cadastro/Entregador/:id",
    name: "ListaEntregador",
    component: CadastroEntregador,
    meta: { requiresAuth: true },
  },
  {
    path: "/Cadastro/Cliente",
    name: "CadastroCliente",
    component: ListaCliente,
    meta: { requiresAuth: true },
  },
  {
    path: "/Cadastro/Cliente/:id",
    name: "CadastroCliente",
    component: CadastroCliente,
    meta: { requiresAuth: true },
  },
  {
    path: "/Cadastro/Produto/:id",
    name: "CadastroProduto",
    component: CadastroProdutoVue,
    meta: { requiresAuth: true },
  },
  {
    path: "/Listar/Pedido",
    name: "ListarPedido",
    component: ListarPedido,
    meta: { requiresAuth: true },
  },
  {
    path: "/:tenant_id/Pedido",
    component: CriarPedido,

    meta: { requiresAuth: false },
  },
  {
    path: "/:tenant_id/Pedido/Consultar",
    component: ConsultarPedido,

    meta: { requiresAuth: false },
  },
  {
    path: "/pedidos/editar/:id",
    component: EditarPedido,
    meta: { requiresAuth: true },
  },
  {
    path: "/Configuracoes/Geral",
    component: Geral,
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    redirect: "/login",
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth === true)) {
    if (!isLoggedIn) {
      next("/Login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
