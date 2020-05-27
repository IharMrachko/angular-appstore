import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$;
  added = '';
  constructor(private productService: ProductService,
              private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
   this.product$ = this.activeRouter.params.pipe(
      switchMap(params => {
        return this.productService.getById(params['id']);
      })
    );
  }

  addProduct(product) {
    this.productService.addProduct(product);
    this.added = 'added to cart';
    setTimeout(() => {
      this.added = '';
    }, 2000);
  }
}
