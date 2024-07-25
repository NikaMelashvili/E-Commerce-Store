import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  // templateUrl: './cart-details.component.html',
  template: `<div class="main-content">
    <div class="section-content section-content-p30">
      <div class="container-fluid">
        <div *ngIf="cartItems.length > 0">
          <table class="table table-bordered">
            <tr>
              <th width="20%">Product Image</th>
              <th width="50%">Product Detail</th>
              <th width="30%"></th>
            </tr>

            <tr *ngFor="let tempCartItem of cartItems">
              <td>
                <img
                  src="{{ tempCartItem.imageUrl }}"
                  class="img-responsive"
                  width="150px"
                />
              </td>
              <td>
                <p>{{ tempCartItem.name }}</p>
                <p>{{ tempCartItem.unitPrice | currency : 'USD' }}</p>
              </td>
              <td>
                <div class="items">
                  <label>Quantity:</label>

                  <div class="row no-gutters">
                    <div class="col">
                      <button
                        (click)="incrementQuantity(tempCartItem)"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>

                    <div class="col ml-4 mr-2">
                      {{ tempCartItem.quantity }}
                    </div>

                    <div class="col">
                      <button
                        (click)="decrementQuantity(tempCartItem)"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>

                    <div class="col-8"></div>
                  </div>
                </div>

                <button
                  (click)="remove(tempCartItem)"
                  class="btn btn-primary btn-sm mt-2"
                >
                  Remove
                </button>

                <p class="mt-2">
                  Subtotal:
                  {{
                    tempCartItem.quantity * tempCartItem.unitPrice
                      | currency : 'USD'
                  }}
                </p>
              </td>
            </tr>

            <tr>
              <td colspan="2"></td>
              <td style="font-weight: bold">
                <p>Total Quantity: {{ totalQuantity }}</p>
                <p>Shipping: FREE</p>
                <p>Total Price: {{ totalPrice | currency : 'USD' }}</p>
                <a routerLink="/checkout" class="btn-primary btn">Checkout</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- if cart is empty then display a message -->
        <div
          *ngIf="cartItems.length == 0"
          class="alert alert-warning col-md-12"
          role="alert"
        >
          Your shopping cart is empty.
        </div>
      </div>
    </div>
  </div> `,
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItem;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
