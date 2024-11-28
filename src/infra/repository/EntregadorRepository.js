import ApiConnection from "./ApiConnection";

class EntregadorRepository {
  async getAll() {
    console.log("congr");
    return await ApiConnection.get("/entregador");
  }

  async insert(entregador) {
    return await ApiConnection.post("/entregador", entregador);
  }

  async update(entregador) {
    return await ApiConnection.put(`/entregador/${entregador.id}`, entregador);
  }

  async getById(id) {
    return await ApiConnection.get(`/entregador/${id}`);
  }

  async delete(id) {
    return await ApiConnection.delete(`/entregador/${id}`);
  }
}

export default new EntregadorRepository();
