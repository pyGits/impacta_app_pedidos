import axios from "axios";
class EnderecoRepository {
  async getByCEP(cep) {
    return await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
  }
}
export default new EnderecoRepository();
