<template>
  <v-container>
    <!-- Botão para adicionar novo cliente -->
    <div>
      <v-btn color="primary" @click="novoCliente">Novo Cliente</v-btn>
    </div>

    <!-- Data Table -->
    <v-data-table :headers="headers" :items="clientes" item-key="id" class="elevation-1 row-pointer">
      <!-- Slot para linhas de itens -->
      <template #item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.cnpjcpf }}</td>
          <td>
            <v-icon small class="mr-2" @click="editarCliente(item)"> mdi-pencil </v-icon>
            <v-icon small class="mr-2" @click="deletarCliente(item)"> mdi-delete </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import CustomError from "@/infra/entity/CustomError";
import Response from "@/infra/entity/Response";
import ClienteController from "@/infra/controller/ClienteController";
export default {
  async mounted() {
    await this.carregarClientes();
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Descrição", value: "descricao" },
        { text: "CNPJ/CPF", value: "cnpjcpf" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      clientes: [],
    };
  },
  methods: {
    novoCliente() {
      this.$router.push("/Cadastro/Cliente/Novo");
    },
    editarCliente(item) {
      this.$router.push(`/Cadastro/Cliente/${item.id}`);
    },
    async deletarCliente(item) {
      const res = await ClienteController.delete(item);
      if (res instanceof Response) this.$toasted.success(res.message);
      await this.carregarClientes();
    },
    async carregarClientes() {
      const res = await ClienteController.getAll();
      if (res.status === 200) this.clientes = res.data;
      if (res instanceof CustomError) this.$toasted.error(res.message);
    },
  },
};
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
.v-toolbar {
  margin-bottom: 16px;
}
</style>
