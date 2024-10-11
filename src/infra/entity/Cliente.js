import CustomError from "./CustomError";
import Endereco from "./Endereco";
import Codigo from "./valueobject/Codigo";
import Descricao from "./valueobject/Descricao";
export default class Cliente {
  constructor(input) {
    const { id = "", nome = "", cnpjcpf = "", rgie = "", telefone = "", celular = "", endereco = {} } = input;
    this.id = Codigo.create(id).value;
    this.nome = Descricao.create(nome, 80).value;
    this.cnpjcpf = cnpjcpf;
    this.rgie = rgie;
    this.telefone = telefone;
    this.celular = celular;
    this.endereco = new Endereco(endereco);
  }
  validate() {
    const error = new CustomError("Erro na validação dos campos", 400);

    if (this.nome === "") {
      error.addError("cliente.nome", "O nome é obrigatório");
    }

    if (error.errors.length > 0) {
      throw error;
    }
  }

  static create(input) {
    const cliente = new Cliente(input);
    cliente.validate();
    return cliente;
  }

  static create_list(input) {
    const list = [];
    input.map((cliente) => {
      list.push(Cliente.create(cliente));
    });
    return list;
  }

  toJson() {
    return {
      id: this.id,
      nome: this.nome,
      cnpjcpf: this.cnpjcpf,
      rgie: this.rgie,
      telefone: this.telefone,
      celular: this.celular,
      ...this.endereco.toJson(),
    };
  }
}
