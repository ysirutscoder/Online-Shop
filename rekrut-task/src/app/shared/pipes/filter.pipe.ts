import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[], cat = ''): any {
    return products.filter( product => {
      // tslint:disable-next-line:triple-equals
      return product.category == cat;
    })
  }
}
