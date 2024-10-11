<template>
  <div>
    <v-card>
      <v-card-title>Cadastro de Cliente</v-card-title>
      <v-card-text>
        <v-row>
          <v-col col="12" sm="1">
            <v-text-field label="ID" v-model="cliente.id" readonly></v-text-field>
          </v-col>
          <v-col col="12" sm="6">
            <v-text-field label="Nome" :error-messages="error.getErrorMessage('cliente.nome')" v-model="cliente.nome"></v-text-field>
          </v-col>
          <v-col col="12" sm="4">
            <v-text-field label="CNPJ/CPF" v-model="cliente.cnpjcpf"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field label="RG/IE" v-model="cliente.rgie"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Telefone" v-model="cliente.telefone"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Celular" v-model="cliente.celular"></v-text-field>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-card-title>Endereço:</v-card-title>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field label="CEP" v-model="cliente.endereco.cep" @keyup.enter="buscarCEP()"></v-text-field>
          </v-col>
          <v-col cols="12" sm="7">
            <v-text-field label="Logradouro" v-model="cliente.endereco.logradouro"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field label="Número" v-model="cliente.endereco.numero"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="2">
            <v-text-field label="Complemento" v-model="cliente.endereco.complemento"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Cidade" v-model="cliente.endereco.cidade"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Bairro" v-model="cliente.endereco.bairro"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field label="UF" v-model="cliente.endereco.uf"></v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-btn color="primary" @click="gravar">Salvar</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import ClienteController from "@/infra/controller/ClienteController";
import ClienteController from "@/infra/controller/ClienteController";
import EnderecoController from "@/infra/controller/EnderecoController";
import Cliente from "@/infra/entity/Cliente";
import CustomError from "@/infra/entity/CustomError";
import Response from "@/infra/entity/Response";

export default {
  async mounted() {
    await this.carregarCliente();
  },
  data() {
    return {
      cliente: new Cliente({}),
      error: new CustomError({}),
    };
  },
  methods: {
    async carregarCliente() {
      const id = this.$route.params.id;
      if (id !== "Novo") {
        const res = await ClienteController.getByID(id);
        this.cliente = new Cliente(res);
      }
    },
    async buscarCEP() {
      const res = await EnderecoController.getByCEP(this.cliente.endereco.cep);
      this.cliente.endereco = res;
    },
    async gravar() {
      const id = this.$route.params.id;
      let res = null;
      if (id === "Novo") {
        res = await ClienteController.insert(this.cliente);
      }
      if (id !== "Novo") {
        res = await ClienteController.update(this.cliente);
      }

      if (res instanceof CustomError) {
        this.error = res;
        this.error.errors.forEach((error) => {
          this.$toasted.error(error.message);
        });
      }

      if (res instanceof Response) {
        this.$toasted.success(res.message);
        this.$router.push("/Cadastro/Cliente");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
