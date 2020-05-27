import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponse, Products} from './interfases';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   type = '';
   cartProducts: Products[] = [];
  constructor(private http: HttpClient) { }

  create(product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        };
      }));
  }

  getAll(): Observable<Products[]>{
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
      }));
  }

  getById(id): Observable<any>{
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: Products) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }));
  }
  delete(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }
  update(product: Products) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }

  setType(type) {
    this.type = type;
  }

  addProduct(product) {
    this.cartProducts.push(product);
  }
}
