import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {Order} from '../../models/order';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  active = 'top';

  constructor() { }

  ngOnInit(): void {
  }
}
