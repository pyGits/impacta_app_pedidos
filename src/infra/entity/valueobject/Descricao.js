export default class Descricao {
  constructor(value) {
    this.value = value;
  }

  static create(ivalue, tamanho_maximo) {
    const value = ivalue.toUpperCase().substring(0, tamanho_maximo);
    return new Descricao(value);
  }
}
