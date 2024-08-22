import CustomError from "./CustomError";
import Codigo from "./valueobject/Codigo";
import Descricao from "./valueobject/Descricao";
export default class Produto {
  constructor(input) {
    const { id = "", descricao = "" } = input;
    this.id = Codigo.create(id).value;
    this.descricao = Descricao.create(descricao).value;
  }
  static create(input) {
    const { id = "", descricao = "" } = input;
    // Verifica o campo 'descricao'
    const error = new CustomError("Erro na validação dos campos", 400);

    if (descricao === "") {
      error.addError("produto.descricao", "A descrição é obrigatória");
    }

    // Verifica o campo 'id'
    if (id === "") {
      error.addError("produto.id", "O ID é obrigatório");
    }

    // Verifica se há algum erro e lança o erro se houver
    if (error.errors.length > 0) {
      throw error;
    }

    return new Produto(input);
  }
}
