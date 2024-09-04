export interface AddProductFacadeInputDto {
  purchasePrice: number;
  description: string;
  stock: number;
  name: string;
  id?: string;
}

export interface CheckStockFacadeInputDto {
  id: string;
}

export interface CheckStockFacadeOutputDto {
  stock: number;
  id: string;
}
