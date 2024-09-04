export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  description: string;
  salesPrice: number;
  name: string;
  id: string;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    description: string;
    salesPrice: number;
    name: string;
    id: string;
  }[];
}
