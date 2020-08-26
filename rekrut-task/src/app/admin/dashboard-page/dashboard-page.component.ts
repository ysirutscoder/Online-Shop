import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products = [];
  pSub: Subscription;
  rSub: Subscription;
  productName: string;
  constructor(private prodSer: ProductService) { }

  ngOnInit() {
    this.pSub = this.prodSer.getAll().subscribe(
      res => {
        this.products = res;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
  delete(id) {
    this.rSub = this.prodSer.deleteItem(id).subscribe(
      () => {
        // tslint:disable-next-line:triple-equals
        this.products = this.products.filter(product => product.id != id);
      }
    )
  }


}
