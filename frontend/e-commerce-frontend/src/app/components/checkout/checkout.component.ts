import { Country } from './../../common/country';
import { FormService } from './../../services/form.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { State } from 'src/app/common/state';

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
                    <div *ngIf="firstName?.errors?.['required']">
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
                    <div *ngIf="lastName?.errors?.['required']">
                      Last Name is required
                    </div>

                    <div *ngIf="lastName?.errors?.['minlength']">
                      Last Name must be at least 2 characters long
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
                    <div *ngIf="email?.errors?.['required']">
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
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
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
    console.log('Data is being processed');
    console.log(this.checkoutFormGroup.get('customer')?.value);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
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

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
}
