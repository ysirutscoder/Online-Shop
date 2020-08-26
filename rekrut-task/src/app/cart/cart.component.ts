import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from "../shared/services/order.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public prodServ: ProductService, private orderServ: OrderService) { }
  cartProducts: Product[] = [];
  form: FormGroup;
  price = 0;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      adress: new FormControl(null, Validators.required),
      payment: new FormControl('cash'),
    })
    this.cartProducts = this.prodServ.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.price += +this.cartProducts[i].cost;
    }
  }
  removeFromCart(i) {
    this.cartProducts.splice(i, 1);
    this.price -= +this.cartProducts[i].cost
  }
  submit() {
    if (this.form.invalid) {
      return;
    } else {
      const order = {
        name: this.form.value.name,
        order: this.cartProducts,
        phone: this.form.value.phone,
        price:this.price,
        adress: this.form.value.adress,
        payment: this.form.value.payment,
        date: new Date(),
      };
      this.orderServ.createOrder(order).subscribe(
          res => {
            this.form.reset();
          }
      );
    }
  }

}
