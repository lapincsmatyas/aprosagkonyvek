import {Component, Input, OnInit} from '@angular/core';
import {Order, OrderState} from '../../../../models/order';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-filtered-orders',
  templateUrl: './admin-filtered-orders.component.html',
  styleUrls: ['./admin-filtered-orders.component.css']
})
export class AdminFilteredOrdersComponent implements OnInit {
  OrderState = OrderState;

  @Input('orders')
  public orders: Order[] = [];

  constructor(private firestore: AngularFirestore, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  deleteOrder(order: Order): void {
    this.firestore.collection('orders').doc(order.id).delete();
  }

  changeState(order: Order, state: OrderState): void {
    this.firestore.collection('orders').doc(order.id).update({state}).then(() => {
      this.firestore.collection('orders').doc(order.id).get().subscribe((result) => {
        order = result.data() as Order;
      });
      this.toastr.success('Sikeres státuszfrissítés');

    });
  }
}
