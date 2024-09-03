export interface AddProductInputDto {
  purchasePrice: number;
  description: string;
  stock: number;
  name: string;
  id?: string;
}

export interface AddProductOutputDto {
  purchasePrice: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  stock: number;
  name: string;
  id: string;
}
