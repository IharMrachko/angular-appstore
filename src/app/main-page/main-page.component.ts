import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {FbResponse, Products} from '../shared/interfases';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  products: Products[];
  productLoading = false;
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
     this.productService.getAll().subscribe(res => {
      this.products = res;
      this.productLoading = true;
    });
  }

}
