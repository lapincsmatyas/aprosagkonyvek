import {KeyValue} from '@angular/common';
import {Item} from './Item';
import {Address} from './address';
import {OrderItem} from './order-item';

export enum OrderState{
  NEW= 'NEW',
  BILLED = 'BILLED',
  PREPARED = 'PREPARED',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED'
}

export class Order {
  id: string;
  items: OrderItem[];
  deliveryType: { name: string, price: number };
  paymentType: {name: string, description: string };
  billingAddress: Address;
  deliveryAddress: Address;
  date: Date;
  state: OrderState = OrderState.NEW;
}
