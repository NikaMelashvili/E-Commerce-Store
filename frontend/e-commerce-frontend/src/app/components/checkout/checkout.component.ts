import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
                  <select formControlName="country">
                    <option>TO DO</option>
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
                    <option>TO DO</option>
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
                    <option>TO DO</option>
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
                    <option>TO DO</option>
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
                    <option>TO DO</option>
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
                  <select formControlName="cardType">
                    <option>TO DO</option>
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

  constructor(private formBuilder: FormBuilder) {}

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
  }

  copyShippingToBilling(event: any) {
    if (event.target.checked) {
      const shippingAddress =
        this.checkoutFormGroup.get('shippingAddress')?.value;
      this.checkoutFormGroup.get('billingAddress')?.setValue(shippingAddress);
    } else {
      this.checkoutFormGroup.get('billingAddress')?.reset();
    }
  }

  onSubmit() {
    console.log('Data is being processed');
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }
}
