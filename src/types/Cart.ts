export interface ItemSize {
  id: string,
  quantity: number
}

export interface CartItemInterface {
  id: string;
  categoryDescription: string;
  title: string;
  price: number;
  pictureUrl: string;
  sizes: ItemSize[];
}

export type CartContextType = {
  cart: CartItemInterface[];
  addItem: (item: CartItemInterface, selectedSize: string, quantity: number) => void;
  getItemInitialCount: (itemId: string, sizeId: string) => number
  removeItem: (item: CartItemInterface) => void
  clear: () => void
  numberOfItems: () => number
  isEmpty: () => boolean
  totalAmount: () => number
};