import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { NewTree, Tree } from '../interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTrees(max: number) {
    const endpoint = `${environment.backendApi}/trees/many`;
    const options = { observe: 'body' as const, params: { max } };
    return new Promise<Tree[]>((res) =>
      this.http.get(endpoint, options).subscribe((body: Tree[]) => res(body))
    );
  }

  getNextTrees() {
    const endpoint = `${environment.backendApi}/trees/random`;
    const options = { observe: 'body' as const };
    return new Promise<{ treeLeft: Tree; treeRight: Tree }>((res) =>
      this.http
        .get(endpoint, options)
        .subscribe((body: { treeLeft: Tree; treeRight: Tree }) => {
          console.log(body);
          res(body);
        })
    );
  }

  getTree(id: string) {
    const endpoint = `${environment.backendApi}/trees/single/${id}`;
    const options = { observe: 'body' as const };
    return new Promise<Tree>((res) =>
      this.http.get(endpoint, options).subscribe((body: Tree) => res(body))
    );
  }

  postVote(winnerId: string, loserId: string) {
    const endpoint = `${environment.backendApi}/trees/vote`;
    const options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      params: { loserId, winnerId },
    };
    return this.http.post(endpoint, null, options).pipe();
  }

  postUpload(newTree: NewTree) {
    const endpoint = `${environment.backendApi}/trees/upload`;
    const options = {
      observe: 'response' as const,
      responseType: 'text' as const,
    };
    return this.http.post(endpoint, newTree, options).pipe();
  }
}
