/**
 * These interfaces are defined in the Swagger API schema.
 */

/**
 * Interface for our GeoInformation
 */
export interface GeoInfo {
  lat: number;
  lon: number;
}
/**
 * Interface for our trees
 */
export interface Tree {
  id: string;
  userName: string;
  treeName: string;
  eloRating: number;
  geo: GeoInfo;
}

export interface NewTree {
  userName: string;
  treeName: string;
  geo: GeoInfo;
  image: string;
}
