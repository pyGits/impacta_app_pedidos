import Cliente from "../entity/Cliente";
import Response from "../entity/Response";
import CustomError from "../entity/CustomError";
import ClienteRepository from "../repository/ClienteRepository";
import { AxiosError } from "axios";

class ClienteController {
  constructor() {
    this.rCliente = ClienteRepository;
  }
  async getAll() {
    try {
      const response = await this.rCliente.getAll();
      const list = Cliente.create_list(response.data);
      return new Response(response.status, "", list);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
  async getByID(id) {
    if (id === "Novo") return new Cliente({});
    const response = await this.rCliente.getById(id);
    const cliente = Cliente.create(response.data);
    return cliente;
  }
  async insert(iCliente) {
    try {
      const cliente = Cliente.create(iCliente);
      const res = await this.rCliente.insert(cliente.toJson());
      return new Response(res.status, res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
  async delete(iCliente) {
    try {
      const cliente = Cliente.create(iCliente);
      const res = await this.rCliente.delete(cliente.toJson());
      return new Response(res.status, res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
  async update(iCliente) {
    try {
      const cliente = Cliente.create(iCliente);
      const response = await this.rCliente.update(cliente.toJson());
      return new Response(response.status, response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
  async getAllByTenant(tenant_id) {
    try {
      const response = await this.rCliente.getAllByTenant(tenant_id);
      const list = Cliente.create_list(response.data);
      return new Response(response.status, "", list);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
}
export default new ClienteController();
