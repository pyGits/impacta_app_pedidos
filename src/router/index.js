import Vue from "vue";
import VueRouter from "vue-router";
import ListaProdutoVue from "@/views/Cadastro/Produto/ListaProduto.vue";
import CadastroProdutoVue from "@/views/Cadastro/Produto/CadastroProduto.vue";
import ListaCliente from "@/views/Cadastro/Cliente/ListaCliente.vue";
import CadastroCliente from "@/views/Cadastro/Cliente/CadastroCliente.vue";
import Login from "@/views/Login/Login.vue";
import Register from "@/views/Login/Register.vue";
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
    meta: { requiresAuth: true }, // Rota protegida
  },
  {
    path: "/Cadastro/Cliente",
    name: "CadastroCliente",
    component: ListaCliente,
    meta: { requiresAuth: true }, // Rota protegida
  },
  {
    path: "/Cadastro/Cliente/:id",
    name: "CadastroCliente",
    component: CadastroCliente,
    meta: { requiresAuth: true }, // Rota protegida
  },
  {
    path: "/Cadastro/Produto/:id",
    name: "CadastroProduto",
    component: CadastroProdutoVue,
    meta: { requiresAuth: true }, // Rota protegida
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token"); // Verifica se há um token de login

  if (!isLoggedIn) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Se a rota requer autenticação e o usuário não está logado
      console.log("NEXT");
      next("/login"); // Redireciona para a página de login
    } else {
      next(); // Permite a navegação
    }
  } else {
    next(); // Continua normalmente
  }
});

export default router;
