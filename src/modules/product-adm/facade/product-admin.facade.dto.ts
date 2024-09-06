export interface AddProductFacadeInputDto {
  purchasePrice: number;
  description: string;
  stock: number;
  name: string;
  id?: string;
}

export interface CheckStockFacadeInputDto {
  productId: string;
}

export interface CheckStockFacadeOutputDto {
  productId: string;
  stock: number;
}
