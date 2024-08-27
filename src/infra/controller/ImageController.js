import ImageRepository from "../repository/ImageRepository";
class ImageController {
  constructor() {
    this.rImage = ImageRepository;
  }

  async getAll() {
    try {
      const response = await this.rImage.getAll();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async uploadImage(imagem) {
    try {
      await this.rImage.uploadImage(imagem);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new ImageController();
