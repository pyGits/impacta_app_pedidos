<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.mdAndUp"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
      width="300"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- Links de navegação da sidebar -->
        <v-list-item to="/Cadastro/Produto" router>
          <v-list-item-title>Cadastrar Produto</v-list-item-title>
        </v-list-item>
        <v-list-item to="/rota2" router>
          <v-list-item-title>Rota 2</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.smAndDown"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Meu App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <!-- Container à direita com router-view -->
          <v-col>
            <!-- Conteúdo da rota carregado aqui -->
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Controle do drawer para telas menores
    };
  },
};
</script>
