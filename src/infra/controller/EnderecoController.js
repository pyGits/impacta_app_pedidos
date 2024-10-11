import Endereco from "../entity/Endereco";
import EnderecoRepository from "../repository/EnderecoRepository";

class EnderecoController {
  async getByCEP(cep) {
    try {
      const res = await EnderecoRepository.getByCEP(cep);
      const data = res.data;
      const endereco = new Endereco({ cep: data.cep, bairro: data.bairro, cidade: data.estado, logradouro: data.logradouro, uf: data.uf });
      return endereco;
    } catch (error) {
      return new Endereco({});
    }
  }
}
export default new EnderecoController();
