import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Order, OrderState} from '../../../models/order';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  active = 'all';
  orders: Order[];
  OrderState = OrderState;

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.firestore.collection<Order>('orders').valueChanges({idField: 'id'}).subscribe((result) => {
      this.orders = result;
    });
  }

}
