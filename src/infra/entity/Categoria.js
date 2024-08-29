export default class Categoria {
  constructor(input) {
    const { id = 0, nome = "" } = input;
    this.id = id;
    this.nome = nome;
  }

  static create(input) {
    return new Categoria(input);
  }

  toJson() {
    return {
      id: this.id,
      nome: this.nome,
    };
  }
}
