<template>
  <div>
    <v-card>
      <v-card-title>Cadastro de Produto</v-card-title>
      <v-card-text>
        <v-text-field
          type="text"
          v-model="produto.id"
          label="ID"
          :disabled="true"
          :error-messages="error.getErrorMessage('produto.id')"
          placeholder="Digite um número"
        />
        <v-text-field
          type="text"
          label="Nome"
          v-model="produto.nome"
          @input="handleInput"
          placeholder="Digite o Nome do Produto"
          :error-messages="error.getErrorMessage('produto.nome')"
        />
        <v-text-field
          type="text"
          label="Preço Venda"
          v-model="produto.preco_venda"
          @input="handleInput"
          placeholder="Digite o Preço de venda do Produto"
          :error-messages="error.getErrorMessage('produto.preco_venda')"
        />
        <UploadImagem @selecionar-imagem="selecionarImagem"></UploadImagem>
        <v-card-title>Foto</v-card-title>
        <v-img :src="'http://localhost:3000/upload/' + produto.imagem" height="200px" contain> </v-img>

        <v-btn @click="gravar">Salvar</v-btn>
        <v-btn @click="cancelar">Cancelar</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ProdutoController from "@/infra/controller/ProdutoController";
import Produto from "@/infra/entity/Produto";
import Response from "@/infra/entity/Response";
import CustomError from "@/infra/entity/CustomError";
import UploadImagem from "@/views/Imagem/UploadImagem.vue";

export default {
  async mounted() {
    this.id = this.$route.params.id;
    await this.carregarProduto();
  },
  data() {
    return {
      id: "",
      produto: new Produto({}),
      file: null,
      error: new CustomError(),
    };
  },
  components: {
    UploadImagem,
  },

  methods: {
    selecionarImagem(imagem) {
      this.produto.imagem = imagem.nome;
    },

    async gravar() {
      const res = await (this.id === "Novo" ? ProdutoController.insert(this.produto) : ProdutoController.update(this.produto));

      if (res instanceof CustomError) {
        this.error = res;
        this.error.errors.forEach((error) => {
          this.$toasted.error(error.message);
        });
      }

      if (res instanceof Response) {
        this.$toasted.success(res.message);
        this.$router.push("/Cadastro/Produto");
      }
    },
    async carregarProduto() {
      this.produto = await ProdutoController.getByID(this.id);
      console.log(this.produto);
    },
    handleInput() {
      this.error = new CustomError();
      const value = new Produto(this.produto);
      this.produto = value;
    },
    cancelar() {
      this.$router.push("/Cadastro/Produto");
    },
  },
};
</script>

<style scoped>
/* Adicione estilos se necessário */
</style>
