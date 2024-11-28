class Entregador {
  constructor({ nome = "", id = 0, telefone = "", status = "ATIVO" }) {
    this.nome = nome; // Nome do entregador
    this.id = id; // ID único do entregador
    this.telefone = telefone; // Telefone do entregador
    this.status = status; // Inicializando status
  }

  // Método para atualizar o status do entregador
  updateStatus(newStatus) {
    this.status = newStatus;
  }

  toJson() {
    return {
      id: this.id,
      nome: this.nome,
      telefone: this.telefone,
      status: this.status, // Incluindo status na representação JSON
    };
  }
}

// Exportando a classe para uso em outros módulos
module.exports = Entregador;
