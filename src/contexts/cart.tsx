import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem, ProductType } from "@/interfaces";

interface CartProps {
  cartList: CartItem[]
  cartIsOpened: boolean
  toggleCart(): void
  addProduct(product: ProductType): void
  removeProduct(id: string): void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartProps)

export function CartProvider({ children }: CartProviderProps) {
  const [cartIsOpened, setIsOpened] = useState(false)
  const [cartList, setCartList] = useState([] as CartItem[])

  function addProduct(product: ProductType) {
    const indexItem = cartList.findIndex(item => item.product.id === product.id)

    if (indexItem >= 0) {
      setCartList(oldList => oldList.map((item, index) => ({
        ...item,
        amount: index === indexItem ? item.amount++ : item.amount,
      })))
    } else {
      setCartList([...cartList, { amount: 1, product }])
    }
  }

  function removeProduct(id: string) {
    setCartList(cartList.filter(({ product }) => product.id !== id))
  }

  function toggleCart() {
    setIsOpened(!cartIsOpened)
  }

  return (
    <CartContext.Provider value={{
      cartList,
      addProduct,
      removeProduct,
      cartIsOpened,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    console.error('useCart must be used within a CartProvider')
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}