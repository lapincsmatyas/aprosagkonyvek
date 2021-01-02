import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service';
import {Item} from '../../models/Item';
import {KeyValue} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  changeCount(item: Item, count: number): void {
    count < 0 ? this.cartService.removeItemFromCart(item) : this.cartService.addItemToCart(item);
  }

  selectDelivery(delivery: KeyValue<string, number>): void {
    this.cartService.selectedDelivery = delivery;
  }

  deleteItemFromCart(item: KeyValue<string, [Item, number]>): void {
    this.cartService.clearItemFromCart(item.key);
    this.toastr.success('Termék törölve a kosárból');
  }
}
