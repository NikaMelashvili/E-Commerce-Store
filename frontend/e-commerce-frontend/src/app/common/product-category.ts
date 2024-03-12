export class ProductCategory {
  public id: number;
  public categoryName: string;

  constructor(categoryId: number, categoryName: string) {
    this.id = categoryId;
    this.categoryName = categoryName;
  }
}
