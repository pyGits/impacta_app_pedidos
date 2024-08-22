export default class Codigo {
  constructor(codigo) {
    this.value = codigo;
  }

  static create(codigo) {
    const value = String(codigo).replace(/\D/g, "");
    return new Codigo(value);
  }
}
