import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../models/Item';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {CartService} from '../../service/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  item: Item;
  count = 1;

  constructor(private router: ActivatedRoute,
              private toastr: ToastrService,
              private firestore: AngularFirestore,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.firestore.collection<Item>('items').doc(params.id).valueChanges({idField: 'id'}).subscribe((item) => {
        this.item = item;
      });
    });
  }

  addToCart(): void {
    this.cartService.addItemToCart(this.item, this.count);
    this.toastr.success('Termék hozzáadva a kosárhoz');
    this.count = 1;
  }

  changeCount(count: number): void {
    if (this.count + count >= 1) {
      this.count += count;
    }
  }
}
