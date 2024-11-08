import Produto from "../entity/Produto";
import Response from "../entity/Response";
import CustomError from "../entity/CustomError";
import ProdutoRepository from "../repository/ProdutoRepository";
import { AxiosError } from "axios";

class ProdutoController {
  constructor() {
    this.rProduto = ProdutoRepository;
  }
  async getAllByTenant(tenant_id) {
    try {
      const response = await this.rProduto.getAllByTenant(tenant_id);
      const list = Produto.create_list(response.data);
      return new Response(response.status, "", list);
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
      const response = await this.rProduto.getAll();
      const list = Produto.create_list(response.data);
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
    if (id === "Novo") return new Produto({});
    const response = await this.rProduto.getById(id);
    const produto = Produto.create(response.data);
    return produto;
  }
  async insert(iProduto) {
    try {
      const produto = Produto.create(iProduto);
      console.log(produto);
      const res = await this.rProduto.insert(produto.toJson());
      return new Response(res.status, res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
  async delete(iProduto) {
    try {
      const produto = Produto.create(iProduto);
      const res = await this.rProduto.delete(produto.toJson());
      return new Response(res.status, res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
  async update(iProduto) {
    try {
      const produto = Produto.create(iProduto);
      const response = await this.rProduto.update(produto.toJson());
      return new Response(response.status, response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
}
export default new ProdutoController();
