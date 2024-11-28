<template>
  <div>
    <v-card>
      <v-card-title class="text-h5">Lista de Entregadores</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :headers="headers" :items="entregadores" :items-per-page="5" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Entregadores</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="adicionarEntregador">Adicionar Entregador</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon @click="editarEntregador(item)">mdi-pencil</v-icon>
            <v-icon @click="excluirEntregador(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import EntregadorController from "@/infra/controller/EntregadorController";
import CustomError from "@/infra/entity/CustomError";

export default {
  data() {
    return {
      entregadores: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "Telefone", value: "telefone" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      error: new CustomError(),
    };
  },
  created() {
    this.carregarEntregadores();
  },
  methods: {
    async carregarEntregadores() {
      const res = await EntregadorController.getAll();
      if (res instanceof CustomError) {
        this.error = res;
        this.error.errors.forEach((error) => {
          this.$toasted.error(error.message);
        });
      } else {
        this.entregadores = res;
      }
    },
    adicionarEntregador() {
      this.$router.push("/Cadastro/Entregador/Novo");
    },
    editarEntregador(entregador) {
      this.$router.push(`/Cadastro/Entregador/${entregador.id}`);
    },
    async excluirEntregador(entregador) {
      console.log(entregador);
      const res = await EntregadorController.delete(entregador.id);
      if (res instanceof CustomError) {
        this.error = res;
        this.error.errors.forEach((error) => {
          this.$toasted.error(error.message);
        });
      } else {
        this.$toasted.success("Entregador excluído com sucesso!");
        this.carregarEntregadores(); // Atualiza a lista
      }
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
</style>
