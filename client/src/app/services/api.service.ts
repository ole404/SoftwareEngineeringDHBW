import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { NewTree, Tree } from '../interfaces/index';

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

@Injectable({
  providedIn: 'root',
})
export class ApiService {
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

  getTrees(max: number) {
    const endpoint = `${environment.backendApi}/trees/many`;
    const options = { observe: 'body' as const, params: { max } };
    return this.http
      .get<Tree[]>(endpoint, options)
      .pipe(catchError(handleError));
    /* return new Promise<Tree[]>((res) =>
      this.http.get(endpoint, options).subscribe((body: Tree[]) => res(body))
    ); */
  }

  getNextTrees() {
    const endpoint = `${environment.backendApi}/trees/random`;
    const options = { observe: 'body' as const };
    return this.http
      .get<{ treeLeft: Tree; treeRight: Tree }>(endpoint, options)
      .pipe(catchError(handleError));
    /* return new Promise<{ treeLeft: Tree; treeRight: Tree }>((res) =>
      this.http
        .get(endpoint, options)
        .subscribe((body: { treeLeft: Tree; treeRight: Tree }) => {
          console.log(body);
          res(body);
        })
    ); */
  }

  getTree(id: string) {
    const endpoint = `${environment.backendApi}/trees/single/${id}`;
    const options = { observe: 'body' as const };
    return this.http.get<Tree>(endpoint, options).pipe(catchError(handleError));
    /* return new Promise<Tree>((res) =>
      this.http.get(endpoint, options).subscribe((body: Tree) => res(body))
    ); */
  }

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
