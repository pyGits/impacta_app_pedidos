import Produto from "./Produto";

export default class ProdutoItem extends Produto {
  constructor(input) {
    super(input);
    this.quantidade = input.quantidade || 0;
  }

  setQuantidade(quantidade) {
    this.quantidade = Number(quantidade);
  }

  getSubtotal() {
    return Number(this.quantidade) * Number(this.preco_venda);
  }

  toJson() {
    return {
      ...super.toJson(),
      quantidade: this.quantidade,
      subtotal: this.getSubtotal(),
    };
  }
}
