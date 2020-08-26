import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/services/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  products$;
  productName: string;
  constructor(private prodSer: ProductService) { }

  ngOnInit() {
    this.products$ = this.prodSer.getAll()
  }

}
