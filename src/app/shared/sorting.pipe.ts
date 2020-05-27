import { Pipe, PipeTransform } from '@angular/core';
import {Products} from './interfases';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Products[], type = ''): any {
    if (type === '' || type === 'ShopAll') {
       return products;
    } else {
      return products.filter(product => {
        return product.type === type;
      });
    }
  }
}
