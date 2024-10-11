import axios from "axios";

class ApiConnection {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000", // Altere para a URL base da sua API
      timeout: 10000, // Tempo de timeout para requisições
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    this.client.interceptors.response.use(
      (response) => {
        // Retorna a resposta normalmente
        return response;
      },
      (error) => {
        // Verifica se o erro é 401
        if ((error.response && error.response.status === 401) || error.response.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
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
  async post_image(endpoint, data = {}) {
    return this.client.post(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new ApiConnection();
