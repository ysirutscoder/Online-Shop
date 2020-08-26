import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponce, Product} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cat = 'main';
  cartProducts: Product [] = [] ;
  constructor(private http: HttpClient) { }
  create(product) {
    return this.http.post(`${environment.DbUrl}/products.json`, product)
      .pipe(
        map((res: FbResponce) => {
          return {
            ...product,
            id: res.name,
            date : new Date(product.date)
          };
        })
      );
  }
  getAll() {
    return this.http.get(`${environment.DbUrl}/products.json`)
      .pipe(
        map(res => {
          return Object.keys(res)
            .map( key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
        } )
      )
  }
  getById(id) {
    return this.http.get(`${environment.DbUrl}/products/${id}.json`)
      .pipe(map((res: Product) => {
        return {
        ...res,
        id,
        date: new Date(res.date)
      }
  }))
  }
  deleteItem(id) {
    return this.http.delete(`${environment.DbUrl}/products/${id}.json`);
  }

  updateItem(product: Product) {
    return this.http.patch(`${environment.DbUrl}/products/${product.id}.json`, product)
      .pipe(map((res: Product) => {
        return {
          ...res,
          id: product.id,
          date: new Date(res.date)
        }
      }))
  }
  setType (cat) {
    this.cat = cat
  }

  addToCart(prod) {
    this.cartProducts.push(prod);
  }
}

