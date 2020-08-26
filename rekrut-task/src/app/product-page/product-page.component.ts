import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(private prodSer: ProductService, private route: ActivatedRoute) { }
  product$ ;
  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        console.log(params['id']);
        return this.prodSer.getById(params['id']);
      }));
  }
  addProduct(prod) {
    this.prodSer.addToCart(prod);
  }

}
