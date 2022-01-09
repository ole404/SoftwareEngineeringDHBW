import { ImageAnnotatorClient, v1 } from '@google-cloud/vision';

class treecognition {
  client: ImageAnnotatorClient;

  constructor(keyFilePath: string) {
    /**
     * @param keyFilePath The path to the JSON key file.
     */
    this.client = new ImageAnnotatorClient({ keyFile: keyFilePath });
  }

  async checkForTreeWithBuffer(image: Buffer): Promise<boolean> {
    /**
     * To use the function with image Buffers alternativly to base64 strings.
     * @param image The image as a Buffer
     */
    const base64Image = image.toString('base64');
    return await this.checkForTree(base64Image);
  }

  async checkForTree(image: string): Promise<boolean> {
    /**
     * Checks if a tree is in the give image and results in true if so.
     * @param image The image as a base64 string
     * */
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
