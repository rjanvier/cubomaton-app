import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Stone } from './stone';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MongodbService {
  
  private stonesUrl = '/api/stones';  // URL to web api
  
  constructor(private http: Http) { }

  // Get all posts from the API
  getAllAcquisitions() {
    return this.http.get('/api/posts')
      .map(res => res.json());
  }
  
//  getAllStones() {
//    return this.http.get(this.stonesUrl)
//      .map(res => res.json());
//  }
//  

  //get("/api/stones")
  getAllStones(): Promise<Stone[]> {
    return this.http.get(this.stonesUrl)
               .toPromise()
               .then(response => response.json() as Stone[])
               .catch(this.handleError);
  }
  
  getStone(id: number): Promise<Stone> {
    const url = `${this.stonesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json() as Stone)
      .catch(this.handleError); //catch server failures
  }
  

//  delete(id: number): Promise<void> {
//    const url = `${this.heroesUrl}/${id}`;
//    return this.http.delete(url, {headers: this.headers})
//      .toPromise()
//      .then(() => null)
//      .catch(this.handleError);
//  }

//  create(name: string): Promise<Stone> {
//    return this.http
//      .post(this.stonesUrl, JSON.stringify({name: name}), {headers: this.headers})
//      .toPromise()
//      .then(res => res.json().data)
//      .catch(this.handleError);
//  }

//  update(hero: Hero): Promise<Hero> {
//    const url = `${this.heroesUrl}/${hero.id}`;
//    return this.http
//      .put(url, JSON.stringify(hero), {headers: this.headers})
//      .toPromise()
//      .then(() => hero)
//      .catch(this.handleError);
//  }


  private handleError(error: any): Promise<any> {
    console.log('error');
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
