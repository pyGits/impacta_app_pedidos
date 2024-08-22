<template>
  <div>
    <v-card>
      <v-card-title>Cadastro de Produto</v-card-title>
      <v-card-text>
        <v-text-field
          type="text"
          v-model="produto.id"
          @input.native="handleInput"
          :error-messages="error.getErrorMessage('produto.id')"
          placeholder="Digite um número"
        />
        <v-text-field
          type="text"
          v-model="produto.descricao"
          @input.native="handleInput"
          placeholder="Digite o Nome do Produto"
          :error-messages="error.getErrorMessage('produto.descricao')"
        />
        <b-button @click="gravar">Salvar</b-button>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ProdutoController from "@/infra/controller/ProdutoController";
import Produto from "@/infra/entity/Produto";
import CustomError from "@/infra/entity/CustomError";
export default {
  async mounted() {
    this.id = this.$route.params.id;
    await this.carregarProduto();
  },
  data() {
    return {
      id: "",
      produto: new Produto({}),
      cProduto: ProdutoController,
      error: new CustomError(),
    };
  },
  methods: {
    async gravar() {
      const res = await (this.id === "Novo"
        ? this.cProduto.insert(this.produto)
        : this.cProduto.update(this.produto));

      if (res instanceof CustomError) {
        this.error = res;
        this.$toasted.error(this.error.message);
      }
    },
    async carregarProduto() {
      this.produto = await this.cProduto.getByID(this.id);
    },
    handleInput() {
      this.error = new CustomError();
      const value = new Produto(this.produto);
      this.produto = value;
    },
  },
};
</script>

<style scoped>
/* Adicione estilos se necessário */
</style>
