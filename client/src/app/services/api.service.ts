import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { NewTree, Tree } from '../interfaces/index';

/**
 * Middleware-like function wich logs a catched error to the console, then re-throw it with rxjs
 *
 * @param error HttpErrorResponse
 */
const handleError = (error: HttpErrorResponse) => {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error on the client occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error
    );
  }
  console.log(error);
  // Return an observable with a user-facing error message.
  return throwError(error.status);
};

/**
 * The ApiService implements the API defined in the Swagger document
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  // Default error messages
  errorMessages = {
    nocon:
      'Cannot connect to the server! Please ensure that you are connected to the internet and that the server is up and running!',
    devmess:
      'A developer fucked up and programmed a bad request (wrong parameter or query). Sorry! :(',
    unknown:
      'An undefined error occured! There is probably something wrong with the server...',
  };

  constructor(private http: HttpClient) {}

  // Used for inject default errors -> not specified for specific request!
  getErrorMsg(status: number) {
    if (status === 0) {
      return this.errorMessages.nocon;
    } else if (status === 400) {
      return this.errorMessages.devmess;
    } else {
      return this.errorMessages.unknown;
    }
  }

  /**
   * Fetch trees from API
   *
   * @param max Maximum number of returned tree, 0 means infinity
   * @returns Obervable<Tree[]>
   */
  getTrees(max: number) {
    const endpoint = `${environment.backendApi}/trees/many`;
    const options = { observe: 'body' as const, params: { max } };
    return this.http
      .get<Tree[]>(endpoint, options)
      .pipe(catchError(handleError));
  }

  /**
   * Fetch two random trees from API
   *
   * @returns Obervable<{ treeLeft: Tree; treeRight: Tree }>
   */
  getNextTrees() {
    const endpoint = `${environment.backendApi}/trees/random`;
    const options = { observe: 'body' as const };
    return this.http
      .get<{ treeLeft: Tree; treeRight: Tree }>(endpoint, options)
      .pipe(catchError(handleError));
  }

  /**
   * Fetch a single tree by ID from API
   *
   * @param id Id of tree
   * @returns Obervable<Tree[]>
   */
  getTree(id: string) {
    const endpoint = `${environment.backendApi}/trees/single/${id}`;
    const options = { observe: 'body' as const };
    return this.http.get<Tree>(endpoint, options).pipe(catchError(handleError));
  }

  /**
   * Post winner and loser of a vote to API
   *
   * @param winnerId Id of the winner tree
   * @param loserId Id of the loser tree
   * @returns Obervable
   */
  postVote(winnerId: string, loserId: string) {
    const endpoint = `${environment.backendApi}/trees/vote`;
    const options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      params: { loserId, winnerId },
    };
    return this.http
      .post(endpoint, null, options)
      .pipe(catchError(handleError));
  }

  /**
   * Post a new Tree to API
   *
   * @param newTree Tree information to be uploaded: picture, user/tree-name, geoinfo...
   * @returns Obervable
   */
  postUpload(newTree: NewTree) {
    console.log("trying to upload ", newTree)
    const endpoint = `${environment.backendApi}/trees/upload`;
    console.log("to: ", endpoint)
    const options = {
      observe: 'response' as const,
      responseType: 'text' as const,
    };
    return this.http
      .post(endpoint, newTree, options)
      .pipe(catchError(handleError));
  }
}
