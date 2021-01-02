import { Injectable } from '@angular/core';
import {Item} from '../models/Item';
import {KeyValue} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Map<string, [Item, number]>();

  public deliveryOptions = new Map<string, number>();
  public selectedDelivery: KeyValue<string, number> = {key: null, value: null};

  constructor() {
    this.deliveryOptions.set('Házhozszállítás GLS-sel', 1490);
    this.deliveryOptions.set('Foxpost csomagautomata', 700);
    this.deliveryOptions.set('Személyes átvétel Mosonmagyaróváron', 0);
  }

  getItemCount(): number {
    let temp = 0;
    this.cart.forEach((value: [Item, number]) => temp += value[1]);
    return temp;
  }

  getSumItemPrice(): number{
    let price = 0;
    this.cart.forEach((value: [Item, number]) => {
      price += value[1] * (value[0].discountPrice ? value[0].discountPrice : value[0].originalPrice);
    });
    return price;
  }

  addMultipleItemToCart(items: Item[]): void{
    items.forEach(item => this.addItemToCart(item));
  }

  addItemToCart(item: Item, count = 1): void{
    if (this.cart.has(item.id)) {
      this.cart.set(item.id, [item, this.cart.get(item.id)[1] + count]);
    } else {
      this.cart.set(item.id, [item, count]);
    }
  }

  removeItemFromCart(item): void {
    if (this.cart.has(item.id) && this.cart.get(item.id)[1] > 1){
      this.cart.set(item.id, [item, this.cart.get(item.id)[1] - 1]);
    }
  }

  clearItemFromCart(item): void {
    this.cart.delete(item);
    console.log(this.cart);
  }

  emptyCart(): void {
    this.cart = new Map<string, [Item, number]>();
    this.selectedDelivery = {key: null, value: null};
  }
}
