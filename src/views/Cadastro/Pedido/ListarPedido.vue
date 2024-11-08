<template>
  <v-container>
    <v-card>
      <v-card-title>
        Lista de Pedidos
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="pedidos" :search="search" :loading="loading" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editarPedido(item)"> mdi-pencil </v-icon>
          <v-icon small @click="deletarPedido(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import PedidoController from "@/infra/controller/PedidoController";
import { formatCurrency, formatDate } from "@/utils/formatters";

export default {
  name: "ListarPedido",
  data() {
    return {
      search: "",
      loading: false,
      headers: [
        { text: "Nº Pedido", value: "id" },
        { text: "Cliente", value: "cliente_nome" },
        { text: "Data", value: "data" },
        { text: "Total", value: "total" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      pedidos: [],
    };
  },
  methods: {
    async fetchPedidos() {
      this.loading = true;
      try {
        const response = await PedidoController.getAll();
        if (response.status === 200) {
          this.pedidos = response.data.map((pedido) => ({
            ...pedido,
            data: formatDate(pedido.data),
            total: formatCurrency(pedido.total),
          }));
        } else {
          this.$toasted.error(response.message || "Erro ao carregar pedidos");
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        this.$toasted.error("Erro ao carregar pedidos");
      } finally {
        this.loading = false;
      }
    },

    async editarPedido(item) {
      this.$router.push(`/pedidos/editar/${item.id}`);
    },

    async deletarPedido(item) {
      if (confirm("Deseja realmente excluir este pedido?")) {
        try {
          const response = await PedidoController.delete(item);
          if (response.status === 200) {
            this.$toasted.success("Pedido excluído com sucesso");
            await this.fetchPedidos();
          } else {
            this.$toasted.error(response.message || "Erro ao excluir pedido");
          }
        } catch (error) {
          console.error("Erro ao excluir pedido:", error);
          this.$toasted.error("Erro ao excluir pedido");
        }
      }
    },
  },
  created() {
    this.fetchPedidos();
  },
};
</script>

<style scoped></style>
