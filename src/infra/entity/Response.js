export default class Response {
  constructor(status = 0, message = "", data = "") {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
