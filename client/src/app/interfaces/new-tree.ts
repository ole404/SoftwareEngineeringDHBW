import { CameraResultType } from '@capacitor/camera';
import GeoInfo from './goeinfo';

export default interface NewTree {
  userName: string;
  treeName: string;
  geo: GeoInfo;
  image: CameraResultType.Base64;
}
