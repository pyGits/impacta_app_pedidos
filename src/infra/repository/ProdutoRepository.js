import ApiConnection from "./ApiConnection";

class ProdutoRepository {
  constructor() {
    this.connection = ApiConnection;
  }
  async getById(id) {
    return await this.connection.get(`/produto/${id}`);
  }
  async insert(produto) {
    return await this.connection.post("/produto", produto);
  }
  async update(produto) {
    return await this.connection.put(`/produto/${produto.id}`, produto);
  }
}
export default new ProdutoRepository();
