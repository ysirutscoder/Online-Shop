import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public prodServ: ProductService) { }
  cartProducts: Product[] = [];
  form: FormGroup;
  price = 0;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    this.cartProducts = this.prodServ.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.price += +this.cartProducts[i].cost;
    }
  }
  removeFromCart(i) {
    this.cartProducts.splice(i, 1);
  }

}
