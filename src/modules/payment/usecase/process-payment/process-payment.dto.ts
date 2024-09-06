export interface ProcessPaymentInputDto {
  orderId: string;
  amount: number;
}

export interface ProcessPaymentOutputDto {
  transactionId: string;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  status: string;
}
