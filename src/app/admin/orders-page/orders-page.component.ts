import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {OrderService} from '../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders = [];
  productName = '';
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    });
  }

  onDelete(id: string) {
    this.orderService.delete(id).subscribe(() => {
      this.orders = this.orders.filter(ord => ord.id !== id);
    });
  }
}
