export interface AddClientInputDto {
  address: string;
  email: string;
  name: string;
  id?: string;
}

export interface AddClientOutputDto {
  address: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  id: string;
}
