export interface Size {
  id: string;
  stock: number;
}

export interface BDProduct {
  id: string;
  categoryCode: string;
  categoryDescription: string;
  title: string;
  description: string;
  price: number;
  pictureUrl: string;
  sizes: Size[];
}