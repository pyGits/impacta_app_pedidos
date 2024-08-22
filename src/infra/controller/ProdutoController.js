import Produto from "../entity/Produto";
import Response from "../entity/Response";
import CustomError from "../entity/CustomError";
import ProdutoRepository from "../repository/ProdutoRepository";
import { AxiosError } from "axios";

class ProdutoController {
  constructor() {
    this.rProduto = ProdutoRepository;
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
      const res = await this.rProduto.insert(produto);
      return new Response(res.status, res.data.message);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return new CustomError(
          error.response.status,
          error.response.data.message
        );
      }
      return error;
    }
  }
  async update(iProduto) {
    const produto = Produto.create(iProduto);
    await this.rProduto.update(produto);
  }
}
export default new ProdutoController();
