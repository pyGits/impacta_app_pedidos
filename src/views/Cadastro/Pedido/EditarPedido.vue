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
            <v-select v-model="pedido.status" :items="statusOptions" label="Status"></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="pedido.entregador_id" :items="entregadores" item-text="nome" item-value="id" label="Entregador"></v-select>
          </v-col>
        </v-row>

        <!-- Seção de Itens -->
        <v-card outlined class="mt-4">
          <v-card-title> Itens do Pedido </v-card-title>

          <v-data-table :headers="itemHeaders" :items="pedido.items" :hide-default-footer="true">
            <template v-slot:item.valor_unitario="{ item }">
              {{ formatCurrency(item.preco_unitario) }}
            </template>
            <!-- <template v-slot:item.subtotal="{ item }"> -->
            <!-- {{ formatCurrency(item.getSubtotal()) }} -->
            <!-- </template> -->
          </v-data-table>
        </v-card>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="seccondary" @click="voltar"> Voltar </v-btn>
        <v-btn color="primary" @click="atualizarPedido">Atualizar Pedido</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import PedidoController from "@/infra/controller/PedidoController";
import { formatCurrency, formatDate } from "@/utils/formatters";
import Pedido from "@/infra/entity/Pedido";
import Response from "@/infra/entity/Response";
import EntregadorController from "@/infra/controller/EntregadorController";

export default {
  name: "EditarPedido",
  data() {
    return {
      entregadores: [],
      pedido: new Pedido({}),
      itemHeaders: [
        { text: "Produto", value: "produto_nome" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Valor Unitário", value: "valor_unitario" },
        { text: "Subtotal", value: "subtotal" },
      ],
      statusOptions: ["PENDENTE", "EM PROGRESSO", "CONCLUÍDO", "CANCELADO"],
    };
  },
  async mounted() {
    await this.carregarEntregadores();
  },
  methods: {
    formatCurrency,
    formatDate,

    async carregarEntregadores() {
      const res = await EntregadorController.getAll();
      this.entregadores = res;
    },
    async atualizarPedido() {
      const res = await PedidoController.atualizarPedido(this.pedido);
      if (res instanceof Response) {
        this.$toasted.success(res.message);
        this.$router.push("/Listar/Pedido");
      } else {
        this.$toasted.error("Erro ao atualizar pedido");
      }
    },

    async carregarPedido() {
      try {
        const response = await PedidoController.getById(this.$route.params.id);
        if (response.status === 200) {
          this.pedido = new Pedido(response.data);
          // Formatando a data
          this.pedido.data = formatDate(this.pedido.data);
        } else {
          this.$toasted.error("Erro ao carregar pedido");
          this.voltar();
        }
      } catch (error) {
        console.error(error);
        this.$toasted.error("Erro ao carregar pedido");
        this.voltar();
      }
    },

    voltar() {
      this.$router.push("/Listar/Pedido");
    },
  },
  async created() {
    if (!this.$route.params.id) {
      this.$toasted.error("Pedido não encontrado");
      this.voltar();
      return;
    }
    await this.carregarPedido();
  },
};
</script>
