<template>
  <v-container>
    <v-card>
      <v-btn @click="consultarPedido">Consultar Pedido</v-btn>
      <v-card-title>Novo Pedido</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Cliente Select -->
          <v-text-field
            v-model="pedido.cliente.celular"
            label="Celular do Cliente"
            :error-messages="errors['pedido.cliente_celular']"
            required
            @blur="handleBlur"
          ></v-text-field>
          <v-text-field v-model="pedido.cliente.nome" label="Nome do Cliente" :error-messages="errors['pedido.cliente_nome']" required></v-text-field>

          <!-- Items do Pedido -->
          <v-card class="mt-4" outlined>
            <v-card-title class="subtitle-1">
              Items do Pedido
              <v-spacer></v-spacer>
              <v-btn @click="showAddItemDialog"> Adicionar Item </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="pedido.items" hide-default-footer>
              <template v-slot:item.preco_venda="{ item }">
                {{ formatCurrency(item.preco_venda) }}
              </template>
              <template v-slot:item.subtotal="{ item }">
                {{ formatCurrency(item.getSubtotal()) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small @click="removeItem(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>

            <v-divider></v-divider>
            <v-card-text class="text-right">
              <strong>Total: {{ formatCurrency(total) }}</strong>
            </v-card-text>
          </v-card>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="$router.push('/pedidos')"> Cancelar </v-btn>
        <v-btn @click="salvar"> Salvar </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Dialog para adicionar item -->
    <v-dialog v-model="dialogAddItem" max-width="500px">
      <v-card>
        <v-card-title>Adicionar Item</v-card-title>
        <v-card-text>
          <v-select v-model="novoItem.produto" :items="produtos" item-text="nome" return-object label="Produto"></v-select>
          <v-text-field v-model.number="novoItem.quantidade" type="number" label="Quantidade" min="1"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialogAddItem = false"> Cancelar </v-btn>
          <v-btn @click="addItem"> Adicionar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pedido from "@/infra/entity/Pedido";
import ProdutoController from "@/infra/controller/ProdutoController";
import ClienteController from "@/infra/controller/ClienteController";
import PedidoController from "@/infra/controller/PedidoController";
import CustomError from "@/infra/entity/CustomError";

export default {
  name: "CriarPedido",

  data: () => ({
    valid: false,
    loading: false,
    dialogAddItem: false,
    pedido: new Pedido({}),
    errors: {},
    produtos: [], // será preenchido com dados da API
    novoItem: {
      produto: null,
      quantidade: 1,
    },
    headers: [
      { text: "Produto", value: "nome" },
      { text: "Preço Unit.", value: "preco_venda" },
      { text: "Quantidade", value: "quantidade" },
      { text: "Subtotal", value: "subtotal" },
      { text: "Ações", value: "actions", sortable: false },
    ],
  }),

  computed: {
    total() {
      return this.pedido.total;
    },
  },

  methods: {
    consultarPedido() {
      this.$router.push(`/${this.$route.params.tenant_id}/Pedido/Consultar`);
    },
    async loadClientes() {
      try {
        const tenant_id = this.$route.params.tenant_id;
        const response = await ClienteController.getAllByTenant(tenant_id);
        if (response.status === 200) {
          this.clientes = response.data;
        } else {
          console.error("Erro ao carregar clientes:", response.message);
        }
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    },

    async loadProdutos() {
      try {
        const tenant_id = this.$route.params.tenant_id;
        const response = await ProdutoController.getAllByTenant(tenant_id);
        if (response.status === 200) {
          this.produtos = response.data;
        } else {
          // Opcional: adicione tratamento de erro
          console.error("Erro ao carregar produtos:", response.message);
        }
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    },

    formatCurrency(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },

    showAddItemDialog() {
      this.novoItem = {
        produto: null,
        quantidade: 1,
      };
      this.dialogAddItem = true;
    },

    addItem() {
      if (this.novoItem.produto && this.novoItem.quantidade > 0) {
        this.pedido.addItem(this.novoItem.produto, this.novoItem.quantidade);
        this.dialogAddItem = false;
      }
    },

    removeItem(item) {
      const index = this.pedido.items.indexOf(item);
      if (index >= 0) {
        this.pedido.items.splice(index, 1);
        this.pedido.total = this.pedido.calculateTotal();
      }
    },

    async salvar() {
      try {
        console.log(this.pedido);
        this.errors = {};
        this.pedido.validate(); // Garante que o pedido é válido antes de enviar
        const tenant_id = this.$route.params.tenant_id;
        const response = await PedidoController.insert(tenant_id, this.pedido);

        this.$toasted.success(response.message);
        this.pedido = new Pedido({});
        if (response instanceof CustomError) {
          if (response.errors) {
            this.errors = response.errors.reduce((acc, err) => {
              acc[err.field] = err.message;
              return acc;
            }, {});
          }
          return;
        }

        // Se chegou aqui, deu tudo certo
      } catch (error) {
        console.log("error", error);
        if (error.errors) {
          this.errors = error.errors.reduce((acc, err) => {
            this.$toasted.error(err.message);
            acc[err.field] = err.message;
            return acc;
          }, {});
        }
      }
    },

    async handleBlur() {
      const res = await ClienteController.getByCelular(this.pedido.cliente.celular, this.$route.params.tenant_id);
      if (res) {
        this.pedido.cliente = res;
      }
    },
  },

  async created() {
    await Promise.all([this.loadClientes(), this.loadProdutos()]);
  },
};
</script>
