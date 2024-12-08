import { Pipe, PipeTransform } from '@angular/core';
import { Document } from './document.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], filter: String): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.modelType.indexOf(filter) !== -1);
}
}
