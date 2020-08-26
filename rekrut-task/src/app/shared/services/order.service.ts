import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {FbResponce} from "../interfaces";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order) {
    return this.http.post(`${environment.DbUrl}/order.json`, order)
        .pipe(
            map((res: FbResponce) => {
              return {
                ...order,
                id: res.name,
                date : new Date(order.date)
              };
            })
        );
  }
  deleteItem(id) {
    return this.http.delete(`${environment.DbUrl}/order/${id}.json`);
  }
  getAll() {
    return this.http.get(`${environment.DbUrl}/order.json`)
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
}
