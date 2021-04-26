import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products = [];
  pSub: Subscription;
  rSub: Subscription;
  productName;

  constructor(private productServ: ProductService) {
  }

  ngOnInit() {
    this.productServ.getAll().subscribe(products => {
      this.products = products;
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
    this.productServ.remove(id).subscribe(() =>
      this.products = this.products.filter(product => product.id !== id));
  }
}
