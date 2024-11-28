import ApiConnection from "./ApiConnection";

class PedidoRepository {
  async insert(tenant_id, pedido) {
    return await ApiConnection.post(`/pedido/${tenant_id}`, pedido);
  }

  async getById(id) {
    return await ApiConnection.get(`/pedido/${id}`);
  }

  async update(pedido) {
    return await ApiConnection.put(`/pedido/${pedido.id}`, pedido);
  }

  async delete(pedido) {
    return await ApiConnection.delete(`/pedido/${pedido.id}`);
  }

  async getAll() {
    return await ApiConnection.get(`/pedido`);
  }
  async getByCelular(tenant_id, celular) {
    return await ApiConnection.get(`/pedido/${tenant_id}/celular/${celular}`);
  }
}

export default new PedidoRepository();
