import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  // templateUrl: './product-details.component.html',
  template: `<div class="detail-section">
    <div class="container-fluid">
      <img src="{{ product.imageUrl }}" alt="image" class="detail-image" />
      <h3>{{ product.name }}</h3>
      <div class="price">{{ product.unitPrice | currency : 'USD' }}</div>
      <button
        (click)="addToCart()"
        class="btn btn-primary btn-sm"
        style="text-decoration: none"
      >
        Add to cart
      </button>
      <hr />
      <h4>Product Description</h4>
      <p>{{ product.description }}</p>
      <hr />
      <a href="/products" class="mt-5">Back to all products</a>
    </div>
  </div> `,
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.ProductService.getProduct(productId).subscribe((data) => {
      this.product = data;
    });
  }
  addToCart() {
    const cart = new CartItem(this.product);
    this.cartService.addToCart(cart);
  }
}
