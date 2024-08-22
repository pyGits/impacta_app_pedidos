<template>
  <v-container>
    <!-- Botão para adicionar novo produto -->
    <div>
      <v-btn color="primary" @click="novoProduto">Novo Produto</v-btn>
    </div>

    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="filteredProdutos"
      item-key="id"
      class="elevation-1"
    >
      <!-- Slot para adicionar campo de pesquisa -->
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Lista de Produtos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
            clearable
          ></v-text-field>
        </v-toolbar>
      </template>

      <!-- Slot para linhas de itens -->
      <template #item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ item.preco }}</td>
          <td>
            <v-icon small class="mr-2" @click="editarProduto(item)">
              mdi-pencil
            </v-icon>
            <v-icon small class="mr-2" @click="deletarProduto(item)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Descrição", value: "descricao" },
        { text: "Preço", value: "preco" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      produtos: [
        { id: 1, descricao: "Produto A", preco: "R$ 10,00" },
        { id: 2, descricao: "Produto B", preco: "R$ 20,00" },
        { id: 3, descricao: "Produto C", preco: "R$ 30,00" },
      ],
    };
  },
  computed: {
    filteredProdutos() {
      if (!this.search) return this.produtos;
      const searchLower = this.search.toLowerCase();
      return this.produtos.filter(
        (produto) =>
          produto.descricao.toLowerCase().includes(searchLower) ||
          produto.preco.toLowerCase().includes(searchLower)
      );
    },
  },
  methods: {
    novoProduto() {
      this.$router.push("/Cadastro/Produto/Novo");
    },
    editarProduto(item) {
      this.$router.push(`/Cadastro/Produto/${item.id}`);
    },
    deletarProduto(item) {
      // Aqui você pode adicionar a lógica para deletar o produto
      console.log("Deletar produto", item);
    },
  },
};
</script>

<style scoped>
.v-toolbar {
  margin-bottom: 16px;
}
</style>
