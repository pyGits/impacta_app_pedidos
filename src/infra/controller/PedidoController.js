import Pedido from "../entity/Pedido";
import Response from "../entity/Response";
import CustomError from "../entity/CustomError";
import PedidoRepository from "../repository/PedidoRepository";
import { AxiosError } from "axios";

class PedidoController {
  constructor() {
    this.rPedido = PedidoRepository;
  }
  async getByCelular(celular, tenant_id) {
    try {
      const response = await PedidoRepository.getByCelular(tenant_id, celular);
      return new Response(response.status, "", response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async atualizarPedido(iPedido) {
    try {
      const response = await this.rPedido.update(iPedido.toJson());
      return new Response(response.status, response.data.message, "");
    } catch (error) {
      console.log(error);
    }
  }

  async insert(tenant_id, iPedido) {
    try {
      const pedido = Pedido.create(iPedido);
      const response = await this.rPedido.insert(tenant_id, pedido.toJson());
      return new Response(response.status, response.data.message);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }

  async getAll() {
    try {
      const response = await this.rPedido.getAll();

      return new Response(response.status, "", response.data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }

  async getById(id) {
    try {
      const response = await this.rPedido.getById(id);
      return new Response(response.status, "", response.data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }

  async update(tenant_id, iPedido) {
    try {
      const pedido = Pedido.create(iPedido);
      const response = await this.rPedido.update(tenant_id, pedido.toJson());
      return new Response(response.status, response.data.message);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }

  async delete(iPedido) {
    try {
      const response = await this.rPedido.delete(iPedido);
      return new Response(response.status, response.data.message);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
}

export default new PedidoController();
