import { Subject } from 'rxjs';
import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItem.length > 0) {
      existingCartItem = this.cartItem.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );
      alreadyExistsInCart = existingCartItem !== undefined;
    }
    if (alreadyExistsInCart && existingCartItem !== undefined) {
      existingCartItem.quantity++;
    } else {
      this.cartItem.push(theCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItem) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItem.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItem.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
