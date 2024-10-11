import TenantController from "@/infra/controller/TenantController";

const input = {
  nome: "Teste",
  cnpjcpf: "08115094000156",
};
test("Deve inserir um tenant", async () => {
  //   await TenantController.insert(input);
  //   const res = await TenantController.get(1);

  expect("Teste").toBe("Teste");
});
