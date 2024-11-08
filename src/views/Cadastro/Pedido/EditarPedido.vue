<template>
  <v-container>
    <v-card>
      <v-card-title> Detalhes do Pedido #{{ pedido.id }} </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="pedido.cliente_id" label="Cliente" readonly></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="pedido.data" label="Data" readonly></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field :value="formatCurrency(pedido.total)" label="Total" readonly></v-text-field>
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
        <v-btn color="primary" @click="voltar"> Voltar </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import PedidoController from "@/infra/controller/PedidoController";
import { formatCurrency, formatDate } from "@/utils/formatters";
import Pedido from "@/infra/entity/Pedido";

export default {
  name: "EditarPedido",
  data() {
    return {
      loading: false,
      pedido: new Pedido({ data: new Date() }),
      itemHeaders: [
        { text: "Produto", value: "produto_nome" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Valor Unitário", value: "valor_unitario" },
        { text: "Subtotal", value: "subtotal" },
      ],
    };
  },
  methods: {
    formatCurrency,
    formatDate,

    async carregarPedido() {
      this.loading = true;
      try {
        const response = await PedidoController.getById(this.$route.params.id);
        if (response.status === 200) {
          this.pedido = response.data;
          console.log(this.pedido);
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
      } finally {
        this.loading = false;
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
