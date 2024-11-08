import CustomError from "./CustomError";
import Codigo from "./valueobject/Codigo";
import Descricao from "./valueobject/Descricao";
import Preco from "./valueobject/Preco";
export default class Produto {
  constructor(input) {
    const { id = "", nome = "", preco_venda = 0, imagem = null, categoria_id = 0 } = input;
    this.id = Codigo.create(id).value;
    this.nome = Descricao.create(nome, 80).value;
    this.preco_venda = Preco.create(preco_venda).value;
    this.imagem = imagem;
    this.categoria_id = categoria_id;
  }
  validate() {
    const error = new CustomError("Erro na validação dos campos", 400);

    if (this.nome === "") {
      error.addError("produto.nome", "O nome é obrigatório");
    }
    if (Preco.create(this.preco_venda).value < 0) {
      error.addError("produto.preco_venda", "Preço de venda não pode ser negativo");
    }

    if (error.errors.length > 0) {
      throw error;
    }
  }

  static create(input) {
    const produto = new Produto(input);
    produto.validate();
    return produto;
  }

  static create_list(input) {
    const list = [];
    input.map((produto) => {
      list.push(Produto.create(produto));
    });
    return list;
  }

  toJson() {
    return {
      id: this.id,
      nome: this.nome,
      preco_venda: this.preco_venda,
      categoria_id: this.categoria_id,
      imagem: this.imagem,
    };
  }
}
