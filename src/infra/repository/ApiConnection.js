import axios from "axios";

class ApiConnection {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000", // Altere para a URL base da sua API
      timeout: 10000, // Tempo de timeout para requisições
      headers: {
        "Content-Type": "application/json",
        // Adicione outros cabeçalhos se necessário
      },
    });
  }

  // Método GET
  async get(endpoint, params = {}) {
    return this.client.get(endpoint, { params });
  }

  // Método POST
  async post(endpoint, data = {}) {
    return this.client.post(endpoint, data);
  }

  // Método PUT
  async put(endpoint, data = {}) {
    return this.client.put(endpoint, data);
  }

  // Método DELETE
  async delete(endpoint, params = {}) {
    return this.client.delete(endpoint, { params });
  }
}

export default new ApiConnection();
