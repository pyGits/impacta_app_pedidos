<template>
  <div id="app" data-app="true">
    <!-- Verifica se o usuário está autenticado -->
    <Container v-if="isLoggedIn"> </Container>
    <v-app v-else>
      <router-view></router-view>
    </v-app>
    <!-- Exibe o login diretamente se não estiver logado -->
  </div>
</template>

<script>
import Container from "@/components/Container/Container.vue";

export default {
  components: {
    Container,
  },
  computed: {
    // Verifica se o usuário está logado
    isLoggedIn() {
      return !!localStorage.getItem("token") && this.$route.meta.requiresAuth;
    },
  },
};
</script>
