import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  // templateUrl: './product-category-menu.component.html',
  template: `<div class="menu-sidebar-content js-scrollbar1">
    <nav class="navbar-sidebar">
      <ul class="list-unstyled navbar-list">
        <li *ngFor="let tempCategory of productCategories">
          <a
            style="text-decoration: none"
            routerLink="/category/{{ tempCategory.id }}"
            routerLinkActive="active-link"
            >{{ tempCategory.categoryName }}</a
          >
        </li>
      </ul>
    </nav>
  </div> `,
  styleUrls: ['./product-category-menu.component.css'],
})
export class ProductCategoryMenuComponent implements OnInit {
  public productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      console.log('Product Categories=' + JSON.stringify(data));
      this.productCategories = data;
    });
  }
}
