export interface PlaceOrderInputDto {
  products: {
    productId: string;
  }[];
  clientId: string;
}

export interface PlaceOrderOutputDto {
  products: {
    productId: string;
  }[];
  invoiceId: string;
  status: string;
  total: number;
  id: string;
}
