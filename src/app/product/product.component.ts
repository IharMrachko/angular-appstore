import {Component, Input, OnInit} from '@angular/core';
import {Products} from '../shared/interfases';
import {ProductService} from '../shared/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Products;
  added = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(product: Products) {
   this.productService.addProduct(product);
   this.added = 'added to cart';
   setTimeout(() => {
     this.added = '';
   }, 2000);
  }
}
