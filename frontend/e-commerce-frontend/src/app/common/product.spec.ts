import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    const product = new Product(
      1, // id
      'SKU123', // sku
      'Product Name', // name
      'Product Description', // description
      9.99, // unitPrice
      'image-url.jpg', // imageUrl
      true, // active
      100, // unitsInStock
      new Date(), // dateCreated
      new Date() // lastUpdated
    );
    expect(product).toBeTruthy();
  });
});
