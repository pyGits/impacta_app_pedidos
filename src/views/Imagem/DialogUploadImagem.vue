<template>
  <v-container>
    <!-- Botão para abrir o modal -->
    <v-btn color="primary" @click="dialog = true">Upload/Selecionar Imagem</v-btn>

    <!-- Modal para upload e seleção de imagem -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="headline">Selecione ou Faça Upload de uma Imagem</v-card-title>

        <v-card-text>
          <!-- Área para upload de nova imagem -->
          <v-form @submit.prevent="submitForm">
            <v-file-input label="Escolha uma imagem" accept="image/*" v-model="file" prepend-icon="mdi-image" outlined required></v-file-input>
            <v-btn color="primary" @click="submitForm">Upload</v-btn>
          </v-form>

          <!-- Exibição das imagens já existentes -->
          <v-row>
            <v-col v-for="imagem in imagens" :key="imagem.id" cols="12" sm="6" md="4">
              <v-card
                :elevation="imagemSelecionada === imagem.id ? 12 : 2"
                :color="imagemSelecionada === imagem.id ? 'blue lighten-4' : ''"
                @click="selecionarImagem(imagem)"
              >
                <v-img :src="`http://127.0.0.1:3000/upload/${imagem.nome}`" aspect-ratio="1.75" class="white--text"> </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ImageController from "@/infra/controller/ImageController";

export default {
  data() {
    return {
      dialog: false, // Controla a visibilidade do modal
      file: null, // Armazena o arquivo selecionado
      imagens: [],
      imagemSelecionada: null, // Armazena a imagem selecionada
    };
  },
  methods: {
    async carregarImagens() {
      this.imagens = await ImageController.getAll();
    },
    selecionarImagem(imagem) {
      this.imagemSelecionada = imagem.nome; // Armazena o ID da imagem selecionada
      this.$emit("selecionar-imagem", imagem);
      this.dialog = false;
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("image", this.file);
      await ImageController.uploadImage(formData);
      this.carregarImagens(); // Atualiza as imagens após o upload
    },
  },
  watch: {
    async dialog(newValue) {
      if (newValue) await this.carregarImagens();
    },
  },
};
</script>

<style scoped>
.v-card-title {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}
</style>
