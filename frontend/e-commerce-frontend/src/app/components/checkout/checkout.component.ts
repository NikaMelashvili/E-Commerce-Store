import { Country } from './../../common/country';
import { FormService } from './../../services/form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
        firstName: [''],
        lastName: [''],
        email: [''],
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
}
