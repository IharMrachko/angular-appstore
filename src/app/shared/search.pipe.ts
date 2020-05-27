import { Pipe, PipeTransform } from '@angular/core';
import {Products} from './interfases';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Products[], productName = ''): any{
    if (!productName.trim()) {
      return products;
    }

    return products.filter(product => {
      return product.title.toLowerCase().includes(productName.toLowerCase().trim());
    });
  }

}
