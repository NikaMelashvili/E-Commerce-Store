import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  // templateUrl: './cart-status.component.html',
  template: `<div class="cart-area d-n">
    <a routerLink="/cart-details">
      <div class="total">
        {{ totalPrice | currency : 'USD' }}
        <span>{{ totalQuantity }}</span>
      </div>
      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </a>
  </div> `,
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
}
