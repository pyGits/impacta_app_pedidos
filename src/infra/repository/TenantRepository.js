import ApiConnection from "./ApiConnection";

class TenantRepository {
  async insert(tenant) {
    return await ApiConnection.post("/tenant", tenant);
  }
  async login(tenant) {
    return await ApiConnection.post("/tenant/login", tenant);
  }
  async get() {
    return await ApiConnection.get("/tenant");
  }
  async newPassword(input) {
    return await ApiConnection.post("/tenant/newPassword", input);
  }
}
export default new TenantRepository();
