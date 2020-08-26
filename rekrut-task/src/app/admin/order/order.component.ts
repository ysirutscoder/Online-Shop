import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../shared/services/order.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnDestroy {
  orders = [];
  oSub:Subscription;
  rSub:Subscription;
  constructor(private orderSer: OrderService) { }

  ngOnInit(): void {
    this.oSub = this.orderSer.getAll().subscribe(orders =>{
      this.orders = orders
    })
  }
  ngOnDestroy(): void {
    if(this.oSub){this.oSub.unsubscribe();}
    if(this.rSub){this.rSub.unsubscribe();}

  }

  remove(id) {
     this.rSub=this.orderSer.deleteItem(id).subscribe(()=>{
      this.orders =  this.orders.filter(order => order.id !== id)
     }

    )
  }
}
