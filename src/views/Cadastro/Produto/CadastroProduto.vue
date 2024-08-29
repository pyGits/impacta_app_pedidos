<template>
  <div class="">
    <v-card>
      <v-card-title class="text-h5">Cadastro de Produto</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2">
              <v-text-field
                type="text"
                v-model="produto.id"
                label="ID"
                :disabled="true"
                :error-messages="error.getErrorMessage('produto.id')"
                placeholder="Digite um número"
                outlined
              />
            </v-col>
            <v-col cols="12" sm="10">
              <v-text-field
                type="text"
                label="Nome"
                v-model="produto.nome"
                @input="handleInput"
                placeholder="Digite o Nome do Produto"
                :error-messages="error.getErrorMessage('produto.nome')"
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4" class="border">
              Foto
              <v-img :src="'http://localhost:3000/upload/' + produto.imagem" height="200px" contain class="mb-4"></v-img>
              <DialogUploadImagem @selecionar-imagem="selecionarImagemDialog" />
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                type="text"
                label="Preço Venda"
                v-model="produto.preco_venda"
                @input="handleInput"
                placeholder="Digite o Preço de venda do Produto"
                :error-messages="error.getErrorMessage('produto.preco_venda')"
                outlined
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="produto.categoria_id"
                :items="categorias"
                item-value="id"
                item-text="nome"
                ref="categoriaSelect"
                label="Escolha uma categoria"
                :filterable="true"
                outlined
              >
                <!-- Slot para exibir cada item da lista com botões -->
                <template v-slot:item="data">
                  <v-list-item @click="selecionarCategoria(data.item)" :class="{ 'v-list-item--active': data.item.id === produto.categoria_id }">
                    <v-list-item-content>
                      <v-list-item-title>{{ data.item.nome }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon @click="editarCategoria(data.item)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon @click.stop="deletarCategoria(data.item)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="1">
              <v-btn @click="novaCategoria"><v-icon>mdi-plus</v-icon></v-btn>
              <DialogCategoria ref="dialogCategoria" @atualizar-categoria="atualizarCategoriaDialog"></DialogCategoria>
            </v-col>
          </v-row>
          <v-col cols="12" sm="4"> </v-col>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn block color="primary" @click="gravar">Salvar</v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn block color="secondary" @click="cancelar">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ProdutoController from "@/infra/controller/ProdutoController";
import CategoriaController from "@/infra/controller/CategoriaController";
import Produto from "@/infra/entity/Produto";
import Response from "@/infra/entity/Response";
import CustomError from "@/infra/entity/CustomError";
import DialogUploadImagem from "@/views/Imagem/DialogUploadImagem.vue";
import DialogCategoria from "@/views/Cadastro/Categoria/DialogCategoria.vue";

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
      selectedItem: null,
      categorias: [],
    };
  },
  components: {
    DialogUploadImagem,
    DialogCategoria,
  },

  methods: {
    selecionarCategoria(categoria) {
      this.produto.categoria_id = categoria.id;
      this.$refs.categoriaSelect.blur();
    },
    async deletarCategoria(categoria) {
      await this.$refs.dialogCategoria.deletarCategoria(categoria);
      await this.carregarCategorias();
    },
    async editarCategoria(categoria) {
      this.$refs.dialogCategoria.editarCategoria(categoria);
      await this.carregarCategorias();
    },
    novaCategoria() {
      this.$refs.dialogCategoria.novaCategoria(true);
    },
    selecionarImagemDialog(imagem) {
      this.produto.imagem = imagem.nome;
    },
    async atualizarCategoriaDialog(id_categoria) {
      await this.carregarCategorias();
      this.produto.categoria_id = id_categoria;
    },
    async carregarCategorias() {
      this.categorias = await CategoriaController.getAll();
    },
    async carregarProduto() {
      await this.carregarCategorias();
      this.produto = await ProdutoController.getByID(this.id);
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
.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.pa-4 {
  padding: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
