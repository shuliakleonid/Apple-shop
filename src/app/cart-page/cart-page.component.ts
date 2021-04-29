import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/ interfases';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = [];
  totalPrice = 0;
  added = '';
  form: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private productServ: ProductService,
    private orderServ: OrderService
  ) {
  }

  ngOnInit() {
    this.cartProducts = this.productServ.cartProducts;
    for (const product of this.cartProducts) {
      this.totalPrice += +product.price;
    }
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    });
  }

  deleteProduct(product: Product) {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      data: new Date()
    };

    this.orderServ.create(order).subscribe(res => {
        this.form.reset();
        this.added = 'Delivery is framed';
        this.submitted = false;
      }
    );
  }
}

