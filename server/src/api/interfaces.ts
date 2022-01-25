/**
 * Interface for our GeoInformation
 */
export interface Geo {
  lat: number;
  lon: number;
}
/**
 * Interface for our trees
 */
export interface Tree {
  userName: string;
  treeName: string;
  eloRating: number;
  geo: Geo;
  image: string;
}

export interface NewTree {
  userName: string;
  treeName: string;
  geo: Geo;
  image: string;
}
