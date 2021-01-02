import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../../models/Item';
import {Order} from '../../../models/order';
import {AngularFirestore} from '@angular/fire/firestore';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewItemComponent} from './new-item/new-item.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent implements OnInit {
  items: Observable<Item[]>;

  constructor(private firestore: AngularFirestore,
              private modalService: NgbModal,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.items = this.firestore.collection<Item>('items').valueChanges({idField: 'id'});

  }

  deleteItem(item: Item): void {
    this.firestore.collection('items').doc(item.id).delete().then(() => {
      this.toastr.success(`Termék ${item.title} sikeresen törölve.`)
    });
  }

  addNemItem(): void {
    const modalRef = this.modalService.open(NewItemComponent);
    modalRef.result.then((item: Item) => {
      if (item) {
        this.firestore.collection('items').add(Object.assign({}, item))
          .then(() => {
            this.toastr.success(`Termék ${item.title} sikeresen hozzáadva.`);
          })
          .catch(() => {
            this.toastr.success(`Termék ${item.title} hozzáadása sikertelen.`);
          });
      }
    });
  }

  editItem(item: Item): void {
    const modalRef = this.modalService.open(NewItemComponent);
    modalRef.componentInstance.item = {...item};
    modalRef.result.then((result: Item) => {
      if (result) {
        this.firestore.collection('items').doc(item.id).set(Object.assign({}, result))
          .then(() => {
            this.toastr.success(`Termék ${result.title} sikeresen szerkesztve.`);
          })
          .catch(() => {
            this.toastr.success(`Termék ${result.title} szerkesztése sikertelen.`);
          });
      }
    });
  }
}
