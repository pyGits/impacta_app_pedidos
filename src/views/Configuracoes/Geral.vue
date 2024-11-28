<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Configurações Gerais</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="salvarConfiguracoes">
          <v-text-field v-model="config.nome" label="Nome" required></v-text-field>
          <v-text-field v-model="config.email" label="Email" required type="email"></v-text-field>
          <v-text-field v-model="config.senha" label="Senha" required type="password"></v-text-field>
          <v-text-field v-model="config.novaSenha" label="Nova Senha" type="password"></v-text-field>
          <v-btn @click="mudarSenha" color="primary">Mudar Senha</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="irParaCardapio">Ir para o Cardápio</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import TenantController from "@/infra/controller/TenantController";
import Login from "@/infra/entity/Login";
import Response from "@/infra/entity/Response";

export default {
  data() {
    return {
      userId: Login.userId,
      config: {
        nome: "",
        email: "",
        senha: "",
        novaSenha: "",
      },
    };
  },
  async mounted() {
    await this.carregarConfig();
  },
  methods: {
    async carregarConfig() {
      const res = await TenantController.get();
      const { nome, email } = res.data;
      this.config.nome = nome;
      this.config.email = email;
    },

    async mudarSenha() {
      const response = await TenantController.newPassword(this.config);
      if (!(response instanceof Response)) {
        this.$toasted.error("Usuário ou senha incorreto, senha não alterada");
      } else {
        this.$toasted.success("Senha alterada com sucesso !");
      }
      // Lógica para mudar a senha
      // console.log("Nova senha:", this.novaSenha);
      // Aqui você pode adicionar a lógica para enviar a nova senha ao servidor
    },
    irParaCardapio() {
      // Lógica para redirecionar para o cardápio em uma nova aba
      window.open(`/${this.userId}/Pedido`, "_blank");
    },
  },
};
</script>

<style scoped>
.configuracoes-gerais {
  max-width: 400px;
  margin: auto;
}
</style>
