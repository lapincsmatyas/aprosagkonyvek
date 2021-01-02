import { Pipe, PipeTransform } from '@angular/core';
import {Order, OrderState} from '../models/order';

@Pipe({name: 'orderFilter'})
export class OrderFilterPipe implements PipeTransform {
  transform(orders: Order[], state: OrderState): Order[] {
    return orders.filter((act) => act.state == state);
  }
}
