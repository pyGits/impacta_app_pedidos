export default class Endereco {
  constructor(input) {
    const { cep = "", logradouro = "", cidade = "", bairro = "", uf = "", complemento = "", numero = "" } = input;
    this.cep = cep;
    this.logradouro = logradouro;
    this.cidade = cidade;
    this.bairro = bairro;
    this.uf = uf;
    this.complemento = complemento;
    this.numero = numero;
  }
  toJson() {
    return {
      cep: this.cep,
      logradouro: this.logradouro,
      cidade: this.cidade,
      bairro: this.bairro,
      uf: this.uf,
      complemento: this.complemento,
      numero: this.numero,
    };
  }
}
