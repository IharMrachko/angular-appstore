import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products = [];
  productName = '';
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  onDelete(id: string) {
    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter(prod => prod.id !== id);
    });
  }
}
