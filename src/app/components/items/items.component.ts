import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Observable<any[]>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
      this.items = this.firestore.collection('items').valueChanges();
      console.log(this.items);
  }

}
