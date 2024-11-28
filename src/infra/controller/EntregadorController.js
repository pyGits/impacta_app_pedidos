import { AxiosError } from "axios";
import EntregadorRepository from "../repository/EntregadorRepository";
import Entregador from "@/infra/entity/Entregador"; // Certifique-se de que a entidade Entregador existe
import CustomError from "../entity/CustomError";
import Response from "../entity/Response";

class EntregadorController {
  async delete(id) {
    try {
      const res = await EntregadorRepository.delete(id);
      return new Response(res.status, res.data.message, res.data.data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }

  async getAll() {
    return (await EntregadorRepository.getAll()).data;
  }

  async getById(id) {
    const response = await EntregadorRepository.getById(id);
    const entregador = new Entregador(response.data);
    return entregador;
  }

  async insert(input) {
    try {
      const entregador = new Entregador(input);
      const res = await EntregadorRepository.insert(entregador.toJson());
      return new Response(res.status, res.data.message, res.data.data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }

  async update(input) {
    try {
      const entregador = new Entregador(input);
      const res = await EntregadorRepository.update(entregador.toJson());
      return new Response(res.status, res.data.message, res.data.data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
}

export default new EntregadorController();
