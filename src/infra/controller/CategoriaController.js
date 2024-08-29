import { AxiosError } from "axios";
import CategoriaRepository from "../repository/CategoriaRepository";
import Categoria from "@/infra/entity/Categoria";
import CustomError from "../entity/CustomError";
import Response from "../entity/Response";

class CategoriaController {
  async delete(input) {
    try {
      const categoria = Categoria.create(input);
      console.log("deletar", categoria, input);
      const res = await CategoriaRepository.delete(categoria.toJson());
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
    return (await CategoriaRepository.getAll()).data;
  }
  async getById(id) {
    const response = await CategoriaRepository.getById(id);
    const categoria = Categoria.create(response.data);
    return categoria;
  }
  async insert(input) {
    try {
      const categoria = Categoria.create(input);
      const res = await CategoriaRepository.insert(categoria.toJson());
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
      const categoria = Categoria.create(input);
      const res = await CategoriaRepository.update(categoria.toJson());
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
export default new CategoriaController();
