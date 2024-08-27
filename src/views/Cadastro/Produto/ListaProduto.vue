<template>
  <v-container>
    <!-- Botão para adicionar novo produto -->
    <div>
      <v-btn color="primary" @click="novoProduto">Novo Produto</v-btn>
    </div>

    <!-- Data Table -->
    <v-data-table :headers="headers" :items="produtos" item-key="id" class="elevation-1">
      <!-- Slot para adicionar campo de pesquisa -->
      <!-- <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Lista de Produtos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details clearable></v-text-field>
        </v-toolbar>
      </template> -->

      <!-- Slot para linhas de itens -->
      <template #item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.preco_venda }}</td>
          <td>
            <v-icon small class="mr-2" @click="editarProduto(item)"> mdi-pencil </v-icon>
            <v-icon small class="mr-2" @click="deletarProduto(item)"> mdi-delete </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import CustomError from "@/infra/entity/CustomError";
import Response from "@/infra/entity/Response";
import ProdutoController from "@/infra/controller/ProdutoController";
export default {
  async mounted() {
    await this.carregarProdutos();
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Descrição", value: "descricao" },
        { text: "Preço Venda", value: "preco_venda" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      produtos: [],
    };
  },
  methods: {
    novoProduto() {
      this.$router.push("/Cadastro/Produto/Novo");
    },
    editarProduto(item) {
      this.$router.push(`/Cadastro/Produto/${item.id}`);
    },
    async deletarProduto(item) {
      const res = await ProdutoController.delete(item);
      if (res instanceof Response) this.$toasted.success(res.message);
      await this.carregarProdutos();
    },
    async carregarProdutos() {
      const res = await ProdutoController.getAll();
      if (res.status === 200) this.produtos = res.data;
      if (res instanceof CustomError) this.$toasted.error(res.message);
    },
  },
};
</script>

<style scoped>
.v-toolbar {
  margin-bottom: 16px;
}
</style>
