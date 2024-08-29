import ApiConnection from "./ApiConnection";

class ProdutoRepository {
  async delete(produto) {
    return await ApiConnection.delete(`/produto/${produto.id}`);
  }
  async getById(id) {
    console.log(id);
    return await ApiConnection.get(`/produto/${id}`);
  }
  async insert(produto) {
    return await ApiConnection.post("/produto", produto);
  }
  async update(produto) {
    return await ApiConnection.put(`/produto/${produto.id}`, produto);
  }
  async getAll() {
    return await ApiConnection.get(`/produto`);
  }
}
export default new ProdutoRepository();
