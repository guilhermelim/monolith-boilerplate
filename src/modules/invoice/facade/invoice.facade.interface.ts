export interface FindInvoiceFacadeOutputDTO {
  items: {
    price: number;
    name: string;
    id: string;
  }[];
  address: string;
  createdAt: Date;
  total: number;
  name: string;
  id: string;
}

export interface GenerateInvoiceFacadeInputDto {
  items: {
    price: number;
    name: string;
    id: string;
  }[];
  address: string;
  name: string;
}

export interface GenerateInvoiceFacadeOutputDto {
  items: {
    price: number;
    name: string;
    id: string;
  }[];
  address: string;
  total: number;
  name: string;
  id: string;
}

export default interface InvoiceFacadeInterface {
  create(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
  find(id: string): Promise<FindInvoiceFacadeOutputDTO>;
}
