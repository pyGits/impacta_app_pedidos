<template>
  <div>
    <!-- <v-btn @click="changeDialog(true)"><v-icon>mdi-plus</v-icon></v-btn> -->
    <v-dialog v-model="dialog" max-width="800px"
      ><v-card>
        <v-card-title class="headline">Cadastro De Categoria</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2">
              <v-text-field type="text" :disabled="true" v-model="categoria.id" label="ID" placeholder="ID" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="10">
              <v-text-field type="text" v-model="categoria.nome" label="Nome da Categoria" outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn block color="primary" @click="salvar">Salvar</v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn block color="seccondary" @click="changeDialog(false)">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CategoriaController from "@/infra/controller/CategoriaController";
import Categoria from "@/infra/entity/Categoria";

export default {
  data() {
    return {
      categoria: new Categoria({}),
      dialog: false,
    };
  },
  methods: {
    novaCategoria() {
      this.categoria = new Categoria({});
      this.changeDialog(true);
    },
    async deletarCategoria(categoria) {
      await CategoriaController.delete(categoria);
    },
    async editarCategoria(categoria) {
      this.categoria = await CategoriaController.getById(categoria.id);
      this.changeDialog(true);
    },
    changeDialog(value) {
      this.dialog = value;
    },
    async salvar() {
      let res;
      if (this.categoria.id !== 0) {
        res = await CategoriaController.update(this.categoria);
      }
      if (this.categoria.id === 0) {
        res = await CategoriaController.insert(this.categoria);
      }

      if (res.status === 201 || res.status === 200) {
        this.$toasted.success(res.message);
        this.dialog = false;
        this.$emit("atualizar-categoria", res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
