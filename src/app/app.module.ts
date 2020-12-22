import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {WhyIsItSpecialComponent} from './components/why-is-it-special/why-is-it-special.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CartComponent} from './components/cart/cart.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ItemComponent } from './components/item/item.component';
import { CounterComponent } from './components/counter/counter.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {CarouselComponent} from './components/items/carousel/carousel.component';
import {ItemsComponent} from './components/items/items.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: 'termekeink', component: ItemsComponent},
  {path: 'termekeink/:id', component: ItemComponent},
  {path: 'miert-kulonleges', component: WhyIsItSpecialComponent},
  {path: 'rolunk', component: AboutUsComponent},
  {path: 'kapcsolat', component: ContactsComponent},
  {path: 'profil', component: ProfileComponent},
  {path: 'kosar', component: CartComponent},
  {path: 'penztar', component: CounterComponent},
  {path: '**', redirectTo: 'termekeink'}
];

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    HeaderComponent,
    WhyIsItSpecialComponent,
    AboutUsComponent,
    ContactsComponent,
    ProfileComponent,
    CartComponent,
    CarouselComponent,
    ItemComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
