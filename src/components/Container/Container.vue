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
          <v-list-item-icon>
            <v-icon>mdi-package</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cadastrar Produto</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/Cadastro/Cliente" router>
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cadastrar Cliente</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/Listar/Pedido" router>
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Listar Pedidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/Cadastro/Entregador" router>
          <v-list-item-icon>
            <v-icon>mdi-bicycle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cadastrar Entregador</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- Submenu de Configurações -->
        <v-list-group v-model="configurationsOpen" prepend-icon="mdi-cog">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Configurações</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/Configuracoes/Geral" router>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Geral</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="$vuetify.breakpoint.smAndDown"></v-app-bar-nav-icon>
      <v-toolbar-title>Delivery Impacta</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Botão de Logout -->
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
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
      configurationsOpen: false, // Controle do submenu de configurações
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token"); // ou a chave que você usa
      window.location.href = "/Login";
    },
  },
};
</script>
