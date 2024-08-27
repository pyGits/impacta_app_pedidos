import ApiConnection from "./ApiConnection";

class ProdutoRepository {
  constructor() {
    this.connection = ApiConnection;
  }
  async delete(produto) {
    return await this.connection.delete(`/produto/${produto.id}`);
  }
  async getById(id) {
    console.log(id);
    return await this.connection.get(`/produto/${id}`);
  }
  async insert(produto) {
    return await this.connection.post("/produto", produto);
  }
  async update(produto) {
    return await this.connection.put(`/produto/${produto.id}`, produto);
  }
  async getAll() {
    return await this.connection.get(`/produto`);
  }
}
export default new ProdutoRepository();
