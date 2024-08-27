import Masks from "../Masks";
export default class Preco {
  constructor(preco = 0) {
    this.value = preco;
  }

  getMoneyValue() {
    return Masks.MaskMoney(this.value);
  }

  static create(preco) {
    const value = Masks.maskMoneyToFloat(preco);
    return new Preco(value);
  }
}
