import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../shared/product.service';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Products} from '../../shared/interfases';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup;
  product: Products;
  submitted = false;

  constructor(private activateRouter: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRouter.params.pipe(
      switchMap(params => {
        return this.productService.getById(params['id']);
      })
    ).subscribe((product: Products) => {
      this.product = product;
      this.form = new FormGroup({
        type: new FormControl(product.type, Validators.required),
        title: new FormControl(product.title, Validators.required),
        photo: new FormControl(product.photo, Validators.required),
        info: new FormControl(product.info, Validators.required),
        price: new FormControl(product.price, [
          Validators.required,
          Validators.pattern(new RegExp('(\\d{1,3}(?:[.,]\\d{3})*(?:[.,]\\d{2})?)\\s?(USD|EUR|€|\\$)'))
        ])
      });
      // console.log(Number.parseInt('-33$'));
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    this.submitted = true;

    const product = {
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    };
    this.productService.update(product).subscribe(res => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
