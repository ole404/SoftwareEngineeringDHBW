import { ImageAnnotatorClient } from '@google-cloud/vision';

export class Treecognition {
  client: ImageAnnotatorClient;

  /**
   * @param keyFilePath The path to the JSON key file.
   */
  constructor(keyFilePath: string) {
    this.client = new ImageAnnotatorClient({ keyFile: keyFilePath });
  }
  /**
   * To use the function with image Buffers alternativly to base64 strings.
   * @param image The image as a Buffer
   */
  async checkForTreeWithBuffer(image: Buffer): Promise<boolean> {
    const base64Image = image.toString('base64');
    return await this.checkForTree(base64Image);
  }
  /**
   * Checks if a tree is in the give image and results in true if so.
   * @param image The image as a base64 string
   * */
  async checkForTree(image: string): Promise<boolean> {
    const [result] = await this.client.labelDetection({
      image: { content: image },
    });
    const labels = result.labelAnnotations;
    // Check if labels is not null and return true if it is a tree
    if (labels != null && labels.length > 0) {
      const hasTrees = labels?.some(
        (label) => label.description === 'tree' || label.description === 'Tree'
      );
      return hasTrees;
    } else {
      return false;
    }
  }
}
