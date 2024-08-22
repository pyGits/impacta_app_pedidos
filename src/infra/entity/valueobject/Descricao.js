export default class Descricao {
  constructor(value) {
    this.value = value;
  }

  static create(ivalue) {
    const value = ivalue.toUpperCase();
    return new Descricao(value);
  }
}
