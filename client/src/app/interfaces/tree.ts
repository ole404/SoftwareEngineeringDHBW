import GeoInfo from './goeinfo';

export default interface Tree {
  id: string;
  userName: string;
  treeName: string;
  eloRating: number;
  geo: GeoInfo;
}
