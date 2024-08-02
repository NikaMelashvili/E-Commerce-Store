import { Country } from './../../common/country';
import { FormService } from './../../services/form.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormValidator } from 'src/app/validators/form-validator';

@Component({
  selector: 'app-checkout',
  // templateUrl: './checkout.component.html',
  template: `<div class="main-content page-m">
    <div class="section-content section-content-p30">
      <div class="container-fluid">
        <form [formGroup]="checkoutFormGroup" (ngSubmit)="onSubmit()">
          <!-- customer -->
          <div formGroupName="customer" class="form-area">
            <h3>Customer</h3>
            <div class="row">
              <div class="col-md-2">
                <label>First Name</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="firstName" type="text" />

                  <div
                    *ngIf="
                      firstName?.invalid &&
                      (firstName?.dirty || firstName?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div
                      *ngIf="firstName?.errors?.['required'] || firstName.errors.notOnlyWhiteSpace"
                    >
                      First Name is required
                    </div>

                    <div *ngIf="firstName?.errors?.['minlength']">
                      First Name must be at least 2 characters long
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Last Name</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="lastName" type="text" />

                  <div
                    *ngIf="
                      lastName?.invalid &&
                      (lastName?.dirty || lastName?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div
                      *ngIf="lastName?.errors?.['required'] || lastName.errors.notOnlyWhiteSpace"
                    >
                      Last Name is required
                    </div>

                    <div *ngIf="lastName?.errors?.['minlength']">
                      shippingCountry Last Name must be at least 2 characters
                      long
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Email</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="email" type="text" />

                  <div
                    *ngIf="email?.invalid && (email?.dirty || email?.touched)"
                    class="alert alert-danger mt-1"
                  >
                    <div
                      *ngIf="email?.errors?.['required'] || email.errors.notOnlyWhiteSpace"
                    >
                      Email is required
                    </div>

                    <div *ngIf="email?.errors?.['pattern']">
                      Wrong Email pattern
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- shipping  -->
          <div formGroupName="shippingAddress" class="form-area">
            <h3>Shipping Address</h3>
            <div class="row">
              <div class="col-md-2">
                <label>Country</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <select
                    formControlName="country"
                    (change)="getState('shippingAddress')"
                  >
                    <option
                      *ngFor="let country of countries"
                      [ngValue]="country"
                    >
                      {{ country.name }}
                    </option>
                  </select>

                  <div
                    *ngIf="
                      shippingCountry?.invalid &&
                      (shippingCountry?.dirty || shippingCountry?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div *ngIf="shippingCountry?.errors?.['required']">
                      Country is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Street</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="street" type="text" />

                  <div
                    *ngIf="
                      shippingStreet?.invalid &&
                      (shippingStreet?.dirty || shippingStreet?.touched)
                    "
                    class="alert alert-danger mt-1"
                    shippingStreet
                  >
                    <div
                      *ngIf="shippingStreet?.errors?.['required'] || shippingStreet.errors.notOnlyWhiteSpace"
                    >
                      Street is required
                    </div>

                    <div *ngIf="shippingStreet?.errors?.['minlength']">
                      Must be at least 2 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>City</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="city" type="text" />

                  <div
                    *ngIf="
                      shippingCity?.invalid &&
                      (shippingCity?.dirty || shippingCity?.touched)
                    "
                    class="alert alert-danger mt-1"
                    shippingCity
                  >
                    <div
                      *ngIf="shippingCity?.errors?.['required'] || shippingCity.errors.notOnlyWhiteSpace"
                    >
                      City is required
                    </div>

                    <div *ngIf="shippingCity?.errors?.['minlength']">
                      Must be at least 2 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>State</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <select formControlName="state">
                    <option
                      *ngFor="let state of shippingStates"
                      [ngValue]="state"
                    >
                      {{ state.name }}
                    </option>
                  </select>

                  <div
                    *ngIf="
                      shippingState?.invalid &&
                      (shippingState?.dirty || shippingState?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div *ngIf="shippingState?.errors?.['required']">
                      State is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Zip Code</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="zipCode" type="text" />

                  <div
                    *ngIf="
                      shippingZipCode?.invalid &&
                      (shippingZipCode?.dirty || shippingZipCode?.touched)
                    "
                    class="alert alert-danger mt-1"
                    shippingZipCode
                  >
                    <div
                      *ngIf="shippingZipCode?.errors?.['required'] || shippingZipCode.errors.notOnlyWhiteSpace"
                    >
                      Zip code is required
                    </div>

                    <div *ngIf="shippingZipCode?.errors?.['minlength']">
                      Must be at least 2 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- same billing as shipping  -->
          <div class="input-space">
            <label class="au-checkbox">
              <input type="checkbox" (change)="copyShippingToBilling($event)" />
              <span class="au-checkmark"></span>Billing address same as Shipping
              address
            </label>
          </div>
          <!-- billing -->
          <div formGroupName="billingAddress" class="form-area">
            <h3>Billing Address</h3>
            <div class="row">
              <div class="col-md-2">
                <label>Country</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <select formControlName="country">
                    <option
                      *ngFor="let country of countries"
                      [ngValue]="country"
                    >
                      {{ country.name }}
                    </option>
                  </select>

                  <div
                    *ngIf="
                      billingCountry?.invalid &&
                      (billingCountry?.dirty || billingCountry?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div *ngIf="billingCountry?.errors?.['required']">
                      Country is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Street</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="street" type="text" />

                  <div
                    *ngIf="
                      billingStreet?.invalid &&
                      (billingStreet?.dirty || billingStreet?.touched)
                    "
                    class="alert alert-danger mt-1"
                    billingStreet
                  >
                    <div
                      *ngIf="billingStreet?.errors?.['required'] || billingStreet.errors.notOnlyWhiteSpace"
                    >
                      Street is required
                    </div>

                    <div *ngIf="billingStreet?.errors?.['minlength']">
                      Must be at least 2 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>City</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="city" type="text" />

                  <div
                    *ngIf="
                      billingCity?.invalid &&
                      (billingCity?.dirty || billingCity?.touched)
                    "
                    class="alert alert-danger mt-1"
                    billingCity
                  >
                    <div
                      *ngIf="billingCity?.errors?.['required'] || billingCity.errors.notOnlyWhiteSpace"
                    >
                      City is required
                    </div>

                    <div *ngIf="billingCity?.errors?.['minlength']">
                      Must be at least 2 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>State</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <select formControlName="state">
                    <option
                      *ngFor="let state of billingStates"
                      [ngValue]="state"
                    >
                      {{ state.name }}
                    </option>
                  </select>

                  <div
                    *ngIf="
                      billingState?.invalid &&
                      (billingState?.dirty || billingState?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div *ngIf="billingState?.errors?.['required']">
                      State is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Zip Code</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="zipCode" type="text" />

                  <div
                    *ngIf="
                      billingZipCode?.invalid &&
                      (billingZipCode?.dirty || billingZipCode?.touched)
                    "
                    class="alert alert-danger mt-1"
                    billingZipCode
                  >
                    <div
                      *ngIf="billingZipCode?.errors?.['required'] || billingZipCode.errors.notOnlyWhiteSpace"
                    >
                      Zip Code is required
                    </div>

                    <div *ngIf="billingZipCode?.errors?.['minlength']">
                      Must be at least 2 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- credit card  -->
          <div formGroupName="creditCard" class="form-area">
            <h3>Credit Card</h3>
            <div class="row">
              <div class="col-md-2">
                <label>Card Type</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <select formControlName="cardType">
                    <option>Visa</option>
                    <option>MasterCard</option>
                  </select>

                  <div
                    *ngIf="
                      cardType?.invalid &&
                      (cardType?.dirty || cardType?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div *ngIf="cardType?.errors?.['required']">
                      Credit Card type is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Name On Card</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="nameOnCard" type="text" />

                  <div
                    *ngIf="
                      nameOnCard?.invalid &&
                      (nameOnCard?.dirty || nameOnCard?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div
                      *ngIf="nameOnCard?.errors?.['required'] || nameOnCard.errors.notOnlyWhiteSpace"
                    >
                      Credit Card name is required
                    </div>

                    <div *ngIf="nameOnCard?.errors?.['minlength']">
                      Must be at least 2 characters long
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Card Number</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="cardNumber" type="text" />

                  <div
                    *ngIf="
                      cardNumber?.invalid &&
                      (cardNumber?.dirty || cardNumber?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div *ngIf="cardNumber?.errors?.['required']">
                      Credit Card number is required
                    </div>

                    <div *ngIf="cardNumber?.errors?.['pattern']">
                      Credit Card number must be 16 digits long
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Security Code</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <input formControlName="securityCode" type="text" />

                  <div
                    *ngIf="
                      securityCode?.invalid &&
                      (securityCode?.dirty || securityCode?.touched)
                    "
                    class="alert alert-danger mt-1"
                  >
                    <div *ngIf="securityCode?.errors?.['required']">
                      Security Code is required
                    </div>

                    <div *ngIf="securityCode?.errors?.['pattern']">
                      Security Code must be 3 digits long
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Experation Month</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <select formControlName="cardType">
                    <option *ngFor="let month of creditCardMonths">
                      {{ month }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Experation Year</label>
              </div>
              <div class="col-md-9">
                <div class="input-space">
                  <select
                    formControlName="cardType"
                    (change)="handleMonthsAndYears()"
                  >
                    <option *ngFor="let year of creditCardYears">
                      {{ year }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!-- order details  -->
          <div class="form-area">
            <h3>Review Your Order</h3>
            <p>Total Quantity: {{ totalQuantity }}</p>
            <p>Shipping FREE</p>
            <p>Total Price: {{ totalPrice | currency : 'USD' }}</p>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info">Purchase</button>
          </div>
        </form>
      </div>
    </div>
  </div> `,
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  countries!: Country[];
  shippingStates!: State[];
  billingStates!: State[];

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          FormValidator.notOnlyWhiteSpace,
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: [''],
        expirationyear: [''],
      }),
    });

    // populating credit card months and years
    const startMonth: number = new Date().getMonth() + 1;

    this.formService.getCreditCardMonth(startMonth).subscribe((data) => {
      console.log('Got the credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    this.formService.getCreditCardYears().subscribe((data) => {
      console.log('years for credit card: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    // country population
    this.formService.getCountries().subscribe((data) => {
      console.log('countires' + data);
      this.countries = data;
    });
  }

  copyShippingToBilling(event: any) {
    if (event.target.checked) {
      const shippingAddress =
        this.checkoutFormGroup.get('shippingAddress')?.value;
      this.checkoutFormGroup.get('billingAddress')?.setValue(shippingAddress);

      // bug fix
      this.billingStates = this.shippingStates;
    } else {
      this.checkoutFormGroup.get('billingAddress')?.reset();
      this.billingStates = [];
    }
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.price = this.totalPrice;
    order.quantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItem;

    // create orderItems for cartItems
    let orderItems: OrderItem[] = cartItems.map((item) => new OrderItem(item));

    // setup purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress =
      this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(
      JSON.stringify(purchase.shippingAddress.state)
    );
    const shippingCountry: Country = JSON.parse(
      JSON.stringify(purchase.shippingAddress.country)
    );
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress =
      this.checkoutFormGroup.controls['shippingAddress'].value;
    const billingState: State = JSON.parse(
      JSON.stringify(purchase.billingAddress.state)
    );
    const billingCountry: Country = JSON.parse(
      JSON.stringify(purchase.billingAddress.country)
    );
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order - orderItem
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call the rest api
    this.checkoutService.placeOrder(purchase).subscribe({
      next: (response) => {
        alert(
          `Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`
        );

        //reset cart
        this.resetCart();
      },
      error: (err) => {
        alert(`There was an error: ${err.message}`);
      },
    });
  }

  resetCart() {
    this.cartService.cartItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset;
    this.router.navigateByUrl('/products');
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(
      creditCardFormGroup?.value.expirationyear
    );

    let startMonth: number;

    if (currentYear === selectYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonth(startMonth).subscribe((data) => {
      console.log(JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  getState(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(countryName);

    this.formService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingStates = data;
      } else {
        this.billingStates = data;
      }

      // selecting first state as a default value
      formGroup?.get('state')?.setValue(data[0]);
    });
  }

  reviewCartDetails() {
    // subscribe to cartTotal quanity
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );
    // subscribe to cartTotal price
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  // customer
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  // shipping
  get shippingStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get shippingCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  // billing
  get billingStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get billingCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  // credit card
  get cardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get nameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get cardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get securityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
}
