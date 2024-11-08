<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>
        <h3 class="text-h5">Cadastro</h3>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field label="Nome" v-model="tenant.nome" :rules="nameRules" :error-messages="nameErrors" required></v-text-field>
          <v-text-field label="E-mail" v-model="tenant.email" :rules="emailRules" :error-messages="emailErrors" required></v-text-field>
          <v-text-field
            label="Senha"
            v-model="tenant.senha"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="togglePasswordVisibility"
            :rules="passwordRules"
            :error-messages="passwordErrors"
            required
          ></v-text-field>
          <v-text-field
            label="Confirmar Senha"
            v-model="tenant.confirm_senha"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="togglePasswordVisibility"
            :rules="confirmPasswordRules"
            :error-messages="confirmPasswordErrors"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="seccondary" @click="submit" :disabled="!valid">Cadastrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import TenantController from "@/infra/controller/TenantController";
import CustomError from "@/infra/entity/CustomError";
import Response from "@/infra/entity/Response";

export default {
  data() {
    return {
      tenant: {
        nome: "",
        email: "",
        senha: "",
        confirm_senha: "",
      },
      error: new CustomError({}),
      valid: false,
      showPassword: false,
      nameRules: [(v) => !!v || "Nome é obrigatório", (v) => (v && v.length >= 3) || "O nome deve ter pelo menos 3 caracteres"],
      emailRules: [(v) => !!v || "E-mail é obrigatório", (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido"],
      passwordRules: [(v) => !!v || "Senha é obrigatória", (v) => (v && v.length >= 6) || "A senha deve ter pelo menos 6 caracteres"],
      confirmPasswordRules: [(v) => !!v || "Confirmação de senha é obrigatória", (v) => v === this.tenant.senha || "As senhas devem coincidir"],
      // Armazena os erros personalizados
      nameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      confirmPasswordErrors: [],
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async submit() {
      if (this.valid) {
        const res = await TenantController.insert(this.tenant);
        if (res instanceof CustomError) {
          this.$toasted.error("Erro ao realizar cadastro verifique os campos !", res.statusCode);
          this.error = res;
          this.error.errors.forEach((error) => {
            this.$toasted.error(error.message);
          });
        }
        console.log(res);

        if (res instanceof Response) {
          this.$toasted.success(res.message);
          this.$router.push("/Login");
        }
      } else {
        this.validateFields();
      }
    },
    validateFields() {
      this.nameErrors = this.tenant.nome ? [] : ["Nome é obrigatório"];
      this.emailErrors = /.+@.+\..+/.test(this.tenant.email) ? [] : ["E-mail deve ser válido"];
      this.passwordErrors = this.tenant.senha.length >= 6 ? [] : ["A senha deve ter pelo menos 6 caracteres"];
      this.confirmPasswordErrors = this.tenant.confirm_senha === this.tenant.senha ? [] : ["As senhas devem coincidir"];
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
