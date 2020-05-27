import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts = [];
  totalPrice = 0;
  form: FormGroup;
  submitted = false;
  added = '';

  constructor(private productService: ProductService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartProducts = this.productService.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += parseInt(this.cartProducts[i].price);
    }
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash', Validators.required)
    });
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()

    };
    this.orderService.create(order).subscribe(res => {
      this.form.reset();
      this.added = 'Delivery is frame';
      setTimeout(() => {
        this.added = '';
      }, 3000)
      this.submitted = false;
    });

  }

  delete(cartProduct: any) {
    this.totalPrice -= parseInt(cartProduct.price);
    this.cartProducts.splice(this.cartProducts.indexOf(cartProduct), 1);
  }
}
