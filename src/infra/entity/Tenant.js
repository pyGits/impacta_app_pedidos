export default class Tenant {
  constructor(input) {
    const { id = null, nome = "", cnpjcpf = "" } = input;
    this.id = id;
    this.nome = nome;
    this.cnpjcpf = cnpjcpf;
  }
}
