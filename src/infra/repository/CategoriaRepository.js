import ApiConnection from "./ApiConnection";
class CategoriaRepository {
  async getAll() {
    return await ApiConnection.get("/categoria");
  }
  async insert(categoria) {
    return await ApiConnection.post("/categoria", categoria);
  }
  async update(categoria) {
    return await ApiConnection.put(`/categoria/${categoria.id}`, categoria);
  }
  async getById(id) {
    return await ApiConnection.get(`/categoria/${id}`);
  }
  async delete(categoria) {
    return await ApiConnection.delete(`/categoria/${categoria.id}`);
  }
}
export default new CategoriaRepository();
