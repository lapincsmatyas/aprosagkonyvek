import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {CartService} from './service/cart.service';
import {Item} from './components/models/Item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'aprosagkonyvek';

  constructor(private firestore: AngularFirestore, private cartService: CartService) {
  }


  ngOnInit(): void {
    this.firestore.collection<Item>('items').valueChanges({idField: 'id'}).subscribe(result => {
      console.log(result);
      this.cartService.addMultipleItemToCart(result);
    });
  }
}

