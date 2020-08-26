import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  @Input() product;
  constructor(private prodSer: ProductService) { }

  ngOnInit(): void {
  }
  addProduct(prod) {
    this.prodSer.addToCart(prod);
  }

}
