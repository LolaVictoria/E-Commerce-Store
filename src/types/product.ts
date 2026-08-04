export type ProductCategory =
  | "HEALTH_AND_BEAUTY"
  | "APPLIANCES"
  | "COMPUTING"
  | "FASHION"
  | "HOME_AND_OFFICE"
  | "PHONES_AND_TABLETS"
  | "ELECTRONICS"
  | "BABY_PRODUCTS";


export interface ProductRequest {
    name: string
    description: string
    price: number
    stock: number
    category: ProductCategory
    imageUrl: string 
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  imageUrl: string;
  sellerName: string;
}


export interface ProductPageResponse {
    content: ProductResponse[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}