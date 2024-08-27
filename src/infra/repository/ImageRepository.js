import ApiConnection from "./ApiConnection";

class ImageRepository {
  constructor() {
    this.connection = ApiConnection;
  }
  async getAll() {
    return await this.connection.get("/image");
  }
  async uploadImage(imagem) {
    return await this.connection.post_image("/image/upload", imagem);
  }
}

export default new ImageRepository();
