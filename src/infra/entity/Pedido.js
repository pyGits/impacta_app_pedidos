import CustomError from "./CustomError";
import Codigo from "./valueobject/Codigo";
import ProdutoItem from "./ProdutoItem";

export default class Pedido {
  constructor(input) {
    const { id = "", cliente_id = "", data = new Date(), items = [] } = input;
    this.id = Codigo.create(id).value;
    this.cliente_id = cliente_id;
    this.data = data;
    this.items = items;
    this.total = this.calculateTotal();
  }

  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + item.getSubtotal();
    }, 0);
  }

  addItem(produto_input, quantidade) {
    const existingItem = this.items.find((item) => item.id === produto_input.id);

    if (existingItem) {
      existingItem.setQuantidade(existingItem.quantidade + Number(quantidade));
    } else {
      const produto = new ProdutoItem(produto_input);
      produto.setQuantidade(quantidade);
      this.items.push(produto);
    }

    this.total = this.calculateTotal();
  }

  validate() {
    const error = new CustomError("Erro na validação dos campos", 400);

    if (this.cliente_id === "") {
      error.addError("pedido.cliente_id", "O cliente é obrigatório");
    }

    if (this.items.length === 0) {
      error.addError("pedido.items", "O pedido deve ter pelo menos um item");
    }

    this.items.forEach((item, index) => {
      if (item.quantidade <= 0) {
        error.addError(`pedido.items[${index}].quantidade`, "A quantidade deve ser maior que zero");
      }
    });

    if (error.errors.length > 0) {
      throw error;
    }
  }

  static create(input) {
    const pedido = new Pedido(input);
    pedido.validate();
    return pedido;
  }

  toJson() {
    return {
      id: this.id,
      cliente_id: this.cliente_id,
      data: this.data,
      items: this.items.map((item) => item.toJson()),
      total: this.total,
    };
  }
}
