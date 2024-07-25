import { CartService } from './../../services/cart.service';
import { ProductCategory } from './../../common/product-category';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-grid.component.html',
  template: `<div class="main-content">
    <div class="section-content section-content-p30">
      <div class="container-fluid">
        <div class="row">
          <!-- loop over the collection of products -->
          <div *ngFor="let tempProduct of products" class="col-md-3">
            <div class="product-box">
              <div class="wrapper-for-col-flex">
                <a routerLink="/products/{{ tempProduct.id }}">
                  <img
                    src="{{ tempProduct.imageUrl }}"
                    class="img-responsive"
                  />
                </a>
                <a routerLink="/products/{{ tempProduct.id }}">
                  <h1>{{ tempProduct.name }}</h1>
                </a>
              </div>

              <div class="price">
                {{ tempProduct.unitPrice | currency : 'USD' }}
              </div>
              <button
                (click)="addToCart(tempProduct)"
                class="btn btn-primary btn-sm"
              >
                Add to cart
              </button>
            </div>
          </div>
          <div
            *ngIf="products?.length == 0"
            class="alert alert-warning col-md-12"
            role="alert"
          >
            No products found.
          </div>
        </div>

        <div class="footer-pagination">
          <div class="row">
            <div class="col-md-6"></div>

            <div class="col-md-6">
              <div class="row">
                <div class="col-md-9" style="padding-left: 30%">
                  <ngb-pagination
                    [(page)]="thePageNumber"
                    [pageSize]="thePageSize"
                    [collectionSize]="theTotalElements"
                    [maxSize]="5"
                    [boundaryLinks]="true"
                    (pageChange)="listProducts()"
                  >
                  </ngb-pagination>
                </div>

                <div class="col-md-3 mt-2" style="text-align: right">
                  <span class="mr-2">Page Size</span>

                  <select
                    #myPageSelect
                    (change)="updatePageSize(myPageSelect.value)"
                  >
                    <option>5</option>
                    <option selected="true">10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div> `,
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  // keyword paginations stuff
  previousKeyword: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(
      `currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`
    );

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe((data: any) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
