<template>
  <div>
    <!-- Verifica se o usuário está autenticado -->
    <Container v-if="isLoggedIn"> </Container>

    <!-- Exibe o login diretamente se não estiver logado -->
    <router-view v-else></router-view>
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
      return !!localStorage.getItem("token"); // Exemplo usando localStorage
    },
  },
};
</script>
