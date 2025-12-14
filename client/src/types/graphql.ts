export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: string | number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface ProductInput {
  title: string;
  price: number;
  description?: string;
  category: string;
  image?: string;
}

export interface GraphQLProductResponse {
  data: {
    product: Product | null;
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export interface GraphQLProductsResponse {
  data: {
    products: Product[];
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export interface GraphQLQueryVariables {
  id?: string | number;
}

