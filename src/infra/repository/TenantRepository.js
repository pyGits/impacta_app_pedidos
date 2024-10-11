import ApiConnection from "./ApiConnection";

class TenantRepository {
  async insert(tenant) {
    return await ApiConnection.post("/tenant", tenant);
  }
  async login(tenant) {
    return await ApiConnection.post("/tenant/login", tenant);
  }
}
export default new TenantRepository();
