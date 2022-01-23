import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParamsOptions,
  HttpResponse,
} from '@angular/common/http';

import { environment } from './../../environments/environment';

import { NewTree, Tree } from '../interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  async getTrees(max: number) {
    const endpoint = `${environment.backendApi}/trees`;
    const options = { observe: 'body' as const, params: { max } };
    return await new Promise<Tree[]>((res) =>
      this.http.get(endpoint, options).subscribe((body: Tree[]) => res(body))
    );
  }

  async getNextTrees() {
    const endpoint = `${environment.backendApi}/trees/random`;
    const options = { observe: 'body' as const };
    return await new Promise<Tree[]>((res) =>
      this.http.get(endpoint, options).subscribe((body: Tree[]) => res(body))
    );
  }

  async getTree(id: string) {
    const endpoint = `${environment.backendApi}/trees/${id}`;
    const options = { observe: 'body' as const };
    return await new Promise<Tree>((res) =>
      this.http.get(endpoint, options).subscribe((body: Tree) => res(body))
    );
  }

  async postVote(winnerId: string, looserId: string) {
    const endpoint = `${environment.backendApi}/trees/vote`;
    const options = {
      observe: 'response' as const,
      params: { winnerId, looserId },
    };
    return await this.http.post(endpoint, options);
  }

  async postUpload(newTree: NewTree) {
    const endpoint = `${environment.backendApi}/trees/upload`;
    const options = { observe: 'response' as const };
    return await this.http.post<NewTree>(endpoint, newTree, options);
  }
}
