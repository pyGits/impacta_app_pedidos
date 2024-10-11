import CustomError from "../entity/CustomError";
import Response from "../entity/Response";
import TenantRepository from "../repository/TenantRepository";
import { AxiosError } from "axios";
class TenantController {
  async insert(input) {
    try {
      const response = await TenantRepository.insert(input);
      return new Response(response.status, response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
  async login(input) {
    try {
      const response = await TenantRepository.login(input);
      return new Response(response.status, response.data.message, response.data.token);
    } catch (error) {
      if (error instanceof AxiosError) {
        return new CustomError(error.response.status, error.response.data.message);
      }
      return error;
    }
  }
}
export default new TenantController();
