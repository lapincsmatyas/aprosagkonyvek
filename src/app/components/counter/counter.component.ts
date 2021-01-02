import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {NgbNav} from '@ng-bootstrap/ng-bootstrap';
import {CartService} from '../../service/cart.service';
import {Address} from '../../models/address';
import {Order} from '../../models/order';
import {AngularFirestore} from '@angular/fire/firestore';
import {OrderItem} from '../../models/order-item';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  public billingAddress = new Address();
  public deliveryAddress = new Address();

  counterForm = this.fb.group({
    billingAddress: this.fb.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      companyName: [''],
      taxNumber: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      streetAndHouseNumber: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]]
    }),
    differentAddress: false,
    deliveryAddress: this.fb.group({
      lastName: [''],
      firstName: [''],
      companyName: [''],
      taxNumber: [''],
      country: [''],
      city: [''],
      streetAndHouseNumber: [''],
      zipCode: [''],
      phoneNumber: [''],
      emailAddress: ['']
    })
  });

  paymentOptions = new Map<string, string>();
  public selectedPaymentOption: KeyValue<string, string> = {key: null, value: null};

  acceptASZF = false;
  acceptDataPolicy = false;

  @ViewChild('counterNav')
  nav: NgbNav;

  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private router: Router,
              private toastr: ToastrService,
              private firestore: AngularFirestore
  ) {
  }

  ngOnInit(): void {
    this.paymentOptions.set('Banki átutalás',
      'OTP Bank (SWIFT/BIC kód: OTPVHUHB)\n' +
      'Horváth Áron Ferenc\n' +
      '11773377-00530167 (Nemzetközi átutalásnál IBAN kód: HU11 11773377 0053067 00000000\n' +
      'Közlemény rovatba kérjük tüntesd fel a rendelésszámot.\n' +
      'Ezeket az adatokat elküldjük emailben is');
    this.paymentOptions.set('Utánvét', 'Jelenleg csak személyes átvételnél választható!');

    this.counterForm.controls.differentAddress.valueChanges.subscribe((value) => {
      console.log(value);
      const deliveryAddress = this.counterForm.controls.deliveryAddress as FormGroup;
      Object.keys(deliveryAddress.controls).forEach(key => {
        console.log(deliveryAddress.get(key));
        if (!value) {
          deliveryAddress.get(key).setValidators([]);
        } else {
          if (key !== 'taxNumber' && key !== 'companyName') {
            deliveryAddress.get(key).setValidators([Validators.required]);
          }
        }
        deliveryAddress.get(key).updateValueAndValidity();
      });
    });

    this.billingAddress.lastName = 'Pelda';
    this.billingAddress.firstName = 'Bela';
    this.billingAddress.emailAddress = 'pelda@bela.com';
    this.billingAddress.country = 'Magyarország';
    this.billingAddress.streetAndHouseNumber = 'Tej út 12.';
    this.billingAddress.zipCode = 9200;
    this.billingAddress.city = 'Győr';
    this.billingAddress.phoneNumber = '+36201231234';
  }

  goToPaymentOptions(): void {
    if (this.counterForm.valid) {
      this.nav.select(2);
    }
  }

  changeSelectedPaymentOption(paymentOption: KeyValue<string, string>): void {
    this.selectedPaymentOption = paymentOption;
  }

  placeOrder(): void {
    const order = new Order();
    order.items = Array.from(this.cartService.cart.values()).map((act) => ({item: act[0], count: act[1]}));
    order.deliveryType = { name: this.cartService.selectedDelivery?.key, price: this.cartService.selectedDelivery?.value};
    order.paymentType = {name: this.selectedPaymentOption?.key, description: this.selectedPaymentOption?.value};
    order.billingAddress = Object.assign({}, this.billingAddress);
    order.date = new Date();
    if (this.counterForm.controls.differentAddress.value) {
      order.deliveryAddress = Object.assign({}, this.deliveryAddress);
    }
    console.log(order);
    this.firestore.collection('orders').add(Object.assign({}, order)).then((result) => {
      this.toastr.success('Rendelés leadása sikeres');
      this.cartService.emptyCart();
      this.router.navigateByUrl('termekeink');
    });
  }

  conditionalValidator(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return condition() ? validator(control) : null;
    };
  }
}


