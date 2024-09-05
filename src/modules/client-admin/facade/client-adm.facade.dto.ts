export interface AddClientFacadeInputDto {
  address: string;
  email: string;
  name: string;
  id?: string;
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutputDto {
  address: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  id: string;
}
