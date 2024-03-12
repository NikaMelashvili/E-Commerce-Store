import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //Pagination stuff
  currentPageNumber: number = 1;
  currentPageSize: number = 10;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
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

    this.productService.searchProducts(theKeyword).subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    ////////////////////////////////////////////

    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(
      `currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.currentPageNumber}`
    );
    ////////////////////////////////////////////

    this.productService
      .getProductListPaginate(
        this.currentPageNumber - 1,
        this.currentPageSize,
        this.currentCategoryId
      )
      .subscribe((data) => {
        this.products = data._embedded.products;
        // +1 is here bc spring data rest starts pagination at 0
        this.currentPageNumber = data.page.number + 1;
        this.currentPageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }
}
