class CustomError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors; // Lista de erros com field, statusCode e message
    Error.captureStackTrace(this, this.constructor);
  }

  // Método para adicionar um erro à lista de erros
  addError(field, message, statusCode = this.statusCode) {
    this.errors.push({ field, message, statusCode });
  }

  // Método para obter a mensagem de erro para um campo específico
  getErrorMessage(field) {
    const error = this.errors.find((err) => err.field === field);
    return error ? error.message : "";
  }

  // Método para verificar se há algum erro em um campo específico
  hasError(field) {
    return this.errors.some((err) => err.field === field);
  }
}

export default CustomError;
