<template>
  <v-container>
    <v-card>
      <v-card-title> Detalhes do Pedido #{{ pedido.id }} </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="pedido.cliente.nome" label="Cliente" disabled></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="pedido.data" label="Data" disabled></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field :value="formatCurrency(pedido.total)" label="Total" disabled></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="pedido.status" label="Status" disabled></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="pedido.entregador.nome" label="Entregador" disabled></v-text-field>
          </v-col>
        </v-row>

        <!-- Seção de Itens -->
        <v-card outlined class="mt-4">
          <v-card-title> Itens do Pedido </v-card-title>

          <v-data-table :headers="itemHeaders" :items="pedido.items" :hide-default-footer="true">
            <template v-slot:item.valor_unitario="{ item }">
              {{ formatCurrency(item.preco_unitario) }}
            </template>
          </v-data-table>
        </v-card>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="voltar"> Voltar </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { formatCurrency } from "@/utils/formatters";
import Pedido from "@/infra/entity/Pedido";
import PedidoController from "@/infra/controller/PedidoController";

export default {
  name: "ConsultarPedido",
  data() {
    return {
      pedido: new Pedido({}),
      itemHeaders: [
        { text: "Produto", value: "produto_nome" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Valor Unitário", value: "valor_unitario" },
        { text: "Subtotal", value: "subtotal" },
      ],
    };
  },
  async created() {
    await this.carregarPedido();
  },
  methods: {
    formatCurrency,
    async carregarPedido() {
      const res = await PedidoController.getByCelular();
      console.log(res);
    },
  },
};
</script>

<style scoped>
.v-btn.v-btn--primary {
  background-color: #1976d2 !important; /* Cor padrão do primary */
}
</style>
