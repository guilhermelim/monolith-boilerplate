export interface FindAllProductsOutputDto {
  products: {
    description: string;
    salesPrice: number;
    name: string;
    id: string;
  }[];
}
