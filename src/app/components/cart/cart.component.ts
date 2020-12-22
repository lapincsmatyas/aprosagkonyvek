import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service';
import {Item} from '../models/Item';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public deliveryOptions = new Map<string, number>();
  public selectedDelivery: KeyValue<string, number> = null;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.deliveryOptions.set('Házhozszállítás GLS-sel', 1490);
    this.deliveryOptions.set('Foxpost csomagautomata', 700);
    this.deliveryOptions.set('Személyes átvétel Mosonmagyaróváron', 0);
  }

  changeCount(item: Item, count: number): void {
    count < 0 ? this.cartService.removeItemFromCart(item) : this.cartService.addItemToCart(item);
  }

  selectDelivery(delivery: KeyValue<string, number>): void {
    this.selectedDelivery = delivery;
  }
}
