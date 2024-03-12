import { ProductCategory } from './product-category';

describe('ProductCategory', () => {
  it('should create an instance', () => {
    // Example values for ProductCategory constructor parameters
    const categoryId = 1;
    const categoryName = 'Category Name';

    // Creating a new instance of ProductCategory with the example values
    const category = new ProductCategory(categoryId, categoryName);

    expect(category).toBeTruthy();
  });
});
