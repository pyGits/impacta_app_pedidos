import ApiConnection from "./ApiConnection";

class PedidoRepository {
  async insert(tenant_id, pedido) {
    return await ApiConnection.post(`/pedido/${tenant_id}`, pedido);
  }

  async getById(id) {
    return await ApiConnection.get(`/pedido/${id}`);
  }

  async update(tenant_id, pedido) {
    return await ApiConnection.put(`/pedido/${tenant_id}/${pedido.id}`, pedido);
  }

  async delete(pedido) {
    return await ApiConnection.delete(`/pedido/${pedido.id}`);
  }

  async getAll() {
    return await ApiConnection.get(`/pedido`);
  }
}

export default new PedidoRepository();
