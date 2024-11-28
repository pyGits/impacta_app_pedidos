<template>
  <div class="">
    <v-card>
      <v-card-title class="text-h5">Cadastro de Entregador</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2">
              <v-text-field type="text" v-model="entregador.id" label="ID" :disabled="true" placeholder="Digite um número" outlined />
            </v-col>
            <v-col cols="12" sm="10">
              <v-text-field type="text" label="Nome" v-model="entregador.nome" placeholder="Digite o Nome do Entregador" outlined />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              Telefone
              <v-text-field type="text" label="Telefone" v-model="entregador.telefone" placeholder="Digite o Telefone do Entregador" outlined />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn block color="primary" @click="gravar">Salvar</v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn block color="secondary" @click="cancelar">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import EntregadorController from "@/infra/controller/EntregadorController";
import CustomError from "@/infra/entity/CustomError";
import Entregador from "@/infra/entity/Entregador";
import Response from "@/infra/entity/Response";

export default {
  async mounted() {
    await this.carregarEntregador();
  },
  data() {
    return {
      id: this.$route.params.id,
      entregador: new Entregador({}),
      error: new CustomError(),
    };
  },
  methods: {
    async carregarEntregador() {
      if (this.id !== "Novo") {
        const res = await EntregadorController.getById(this.id);
        this.entregador = res;
      }
    },
    async gravar() {
      const res = await (this.id === "Novo" ? EntregadorController.insert(this.entregador) : EntregadorController.update(this.entregador));

      if (res instanceof CustomError) {
        this.error = res;
        this.error.errors.forEach((error) => {
          this.$toasted.error(error.message);
        });
      }

      if (res instanceof Response) {
        this.$toasted.success(res.message);
        this.$router.push("/Cadastro/Entregador");
      }
    },
    cancelar() {
      this.$router.push("/Cadastro/Entregador");
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

.mb-4 {
  margin-bottom: 16px;
}
</style>
