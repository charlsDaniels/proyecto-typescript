import { createContext, useEffect, useState } from "react";
import { CartContextType } from "../types/Cart";
import { CartItemInterface } from "../types/Cart";

export const CartContext = createContext<CartContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItemInterface[]>([]);

  const addItem = (
    item: CartItemInterface,
    selectedSize: string,
    quantity: number
  ) => {
    if (isInCart(item)) {
      const newCart = cart.reduce((accum, _item) => {
        if (item.id !== _item.id) {
          return accum.concat(_item);
        } else {
          const sizeIndex = _item.sizes.findIndex(
            (size) => size.id === selectedSize
          );
          const sizes = [..._item.sizes];
          if (sizeIndex !== -1) {
            sizes[sizeIndex].quantity += quantity;
          } else {
            sizes.push({
              id: selectedSize,
              quantity,
            });
          }
          return accum.concat({
            ...item,
            sizes,
          });
        }
      }, [] as CartItemInterface[]);
      persistCart(newCart);
    } else {
      const sizes = [
        {
          id: selectedSize,
          quantity,
        },
      ];
      const newCart = [
        ...cart,
        {
          ...item,
          sizes,
        },
      ];
      persistCart(newCart);
    }
  };

  const persistCart = (cart: CartItemInterface[]) => {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getItemInitialCount = (itemId: string, sizeId: string) => {
    let initial = 0;

    const item = cart.find((item) => item.id === itemId);
    if (item) {
      const size = item.sizes.find((size) => size.id === sizeId);
      if (size) {
        initial = size.quantity;
      }
    }

    return initial;
  };

  const removeItem = (item: CartItemInterface) => {
    const newCart = cart.filter((_item) => _item.id !== item.id);
    persistCart(newCart);
  };

  const clear = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const isInCart = (item: CartItemInterface) => {
    return cart.some((_item) => _item.id === item.id);
  };

  const numberOfItems = () => {
    return cart
      .flatMap((item) => item.sizes)
      .reduce((acc, item) => acc + item.quantity, 0);
  };

  const isEmpty = () => {
    return numberOfItems() === 0;
  };

  const totalAmount = () => {
    const totalItemsAndPrice = cart.map((item) => {
      const quantity = item.sizes.reduce(
        (acc, size) => acc + size.quantity,
        0
      );
      return { quantity, price: item.price };
    });

    return totalItemsAndPrice.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        getItemInitialCount,
        removeItem,
        clear,
        numberOfItems,
        isEmpty,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
