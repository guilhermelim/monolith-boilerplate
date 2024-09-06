export interface PaymentFacadeInputDto {
  orderId: string;
  amount: number;
}

export interface PaymentFacadeOutputDto {
  transactionId: string;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  status: string;
}
