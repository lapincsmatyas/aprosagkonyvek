import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {Item} from '../models/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Observable<Item[]>;

  constructor(private fireStore: AngularFirestore,
              private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
      this.items = this.fireStore.collection<Item>('items').valueChanges({idField: 'id'});


  }

}
