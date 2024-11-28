class Login {
  constructor() {
    this.token = null;
    this.decodedToken = 0;
    this.userId = 0;
    this.setAutenticate();
  }

  setAutenticate() {
    this.token = localStorage.getItem("token");
    this.decodedToken = this.decodeToken() || { token: null };
    this.userId = this.decodedToken.userId || 0;
  }

  decodeToken() {
    if (this.token) {
      const payload = this.token.split(".")[1]; // Obtém a parte do payload
      const decoded = JSON.parse(atob(payload)); // Decodifica e analisa o payload
      return decoded;
    }
    return 0;
  }
}
export default new Login();
