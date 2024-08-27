export default class Masks {
  static MaskMoney(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  static maskMoneyToFloat(value) {
    if (typeof value === "string") {
      let numericValue;
      if (value.includes("-")) {
        numericValue = Number(value.replace(/[^\d-]/g, "").replace(/[-]/g, ""));
        numericValue *= -1;
      } else {
        numericValue = Number(value.replace(/[^\d-]/g, ""));
      }

      return numericValue / 100;
    } else {
      return value;
    }
  }
}
