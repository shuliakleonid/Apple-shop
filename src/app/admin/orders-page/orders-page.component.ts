import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrderService} from '../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders = [];
  pSub: Subscription;
  rSub: Subscription;
  productName;

  constructor(private orderServ: OrderService) {
  }

  ngOnInit() {
    this.orderServ.getAll().subscribe(orders => {
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }

  }

  remove(id) {
    this.rSub = this.orderServ.remove(id).subscribe(() =>
      this.orders = this.orders.filter(product => product.id !== id));
  }
}
