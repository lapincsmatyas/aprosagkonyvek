import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {CartService} from './service/cart.service';
import {Item} from './models/Item';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'aprosagkonyvek';

  constructor(private toasrt: ToastrService) {
  }


  ngOnInit(): void {
  }
}

