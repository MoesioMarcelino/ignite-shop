import { ReactNode } from "react";

import { CartProvider } from './cart'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return <CartProvider>{children}</CartProvider>
}