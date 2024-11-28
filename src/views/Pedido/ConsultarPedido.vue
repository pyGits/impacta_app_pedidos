<template>
  <v-container>
    <h1>Consultar Pedidos</h1>
    <v-text-field v-model="phoneNumber" label="Digite o número de celular" />
    <v-btn @click="consultarPedido">Consultar</v-btn>
    <v-row v-if="pedido">
      <v-col v-for="item in pedido" :key="item.id" cols="12" md="4">
        <v-card>
          <v-card-title>Pedido {{ item.id }}</v-card-title>
          <v-card-text>
            <div><strong>Data:</strong> {{ new Date(item.data).toLocaleString() }}</div>
            <div><strong>Total:</strong> R$ {{ item.total }}</div>
            <div><strong>Status:</strong> {{ item.status }}</div>
            <div><strong>Entregador:</strong> {{ item.nome }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PedidoController from "@/infra/controller/PedidoController";

export default {
  data() {
    return {
      phoneNumber: "11958114535",
      pedido: null,
    };
  },
  methods: {
    async consultarPedido() {
      console.log("jdklsajdklas");
      const res = await PedidoController.getByCelular(this.phoneNumber, this.$route.params.tenant_id);
      console.log(res);
      // Lógica para consultar o pedido com base no número de celular
      // Exemplo: this.pedido = buscarPedidoPorCelular(this.phoneNumber);
      // Simulação de dados para exemplo
      this.pedido = res.data;
    },
  },
};
</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui */
</style>
