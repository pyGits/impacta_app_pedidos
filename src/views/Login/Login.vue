<template>
  <v-container>
    <!-- Usando v-row para centralizar corretamente -->
    <v-row align="center" justify="center">
      <v-col>
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-form ref="loginForm" v-model="valid" @submit.prevent="submitLogin">
              <v-text-field v-model="email" label="E-mail" :rules="emailRules" prepend-icon="mdi-email" required></v-text-field>
              <v-text-field v-model="password" label="Senha" :rules="passwordRules" type="password" prepend-icon="mdi-lock" required></v-text-field>
              <v-row>
                <v-btn color="seccondary" @click="submitLogin()" tonal>Login</v-btn>
                <v-btn @click="() => this.$router.push('/cadastro')"> Registrar </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TenantController from "@/infra/controller/TenantController";
import CustomError from "@/infra/entity/CustomError";
import Login from "@/infra/entity/Login";

export default {
  data() {
    return {
      email: "peeyotenorges@gmail.com",
      password: "6425025x",
      valid: false,
      emailRules: [(v) => !!v || "E-mail é obrigatório", (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido"],
      passwordRules: [(v) => !!v || "Senha é obrigatória", (v) => (v && v.length >= 6) || "A senha deve ter pelo menos 6 caracteres"],
    };
  },
  methods: {
    async submitLogin() {
      if (this.$refs.loginForm.validate()) {
        const res = await TenantController.login({ email: this.email, password: this.password });

        if (res instanceof CustomError) {
          this.$toasted.error("Login ou senha inválido !");
        }
        if (res.status === 200) {
          Login.setAutenticate();
          localStorage.setItem("token", res.data.token);
          window.location.href = "/Cadastro/Produto";
        }
      } else {
        this.$refs.loginForm.reset();
        alert("E-mail ou senha inválidos");
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.v-card {
  width: 100%;
}
</style>
