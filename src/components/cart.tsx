import Image from 'next/image'

import { Button } from '@/components'
import { bagActiveIcon } from '@/assets'
import { useCart } from '@/contexts/cart'

import {
  Container,
  Backdrop,
  Content,
  Main,
  Product,
  Footer,
  EmptyCart
} from '@/styles/components/cart'
import { useMemo, useState } from 'react'
import axios from 'axios'

export function Cart() {
  const { cartIsOpened, removeProduct, toggleCart, cartList } = useCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  const totalCost = cartList.reduce((acc, { product, amount }) => {
    return acc + ((product.priceUnit * amount) / 100)
  }, 0)

  const totalFormatted = new Intl.NumberFormat(
    'pt-BR',
    { currency: 'BRL', style: 'currency' }).format(totalCost)

  const totalItems = useMemo(() => cartList.reduce((acc, { amount }) => acc + amount, 0), [cartList])

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        products: cartList
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  if (!cartIsOpened) {
    return null
  }

  return <Container>
    <Backdrop onClick={toggleCart} />
    <Content>
      <header onClick={toggleCart} >x</header>

      <h2>Sacola de compras</h2>

      {cartList.length
        ? (
          <>
            <Main>
              {cartList.map(({ product, amount }) => (
                <Product key={product.id}>
                  <Image src={product.imageUrl} width={93} height={100} alt="" />

                  <section>
                    <h3>{product.name}</h3>
                    <p>{amount}x {product.price}</p>
                    <h4 onClick={() => removeProduct(product.id)}>Remover</h4>
                  </section>
                </Product>
              ))}
            </Main>

            <Footer>
              <h4>
                Quantidade
                <span>{totalItems} item(s)</span>
              </h4>

              <h3>
                Valor total
                <span>
                  {totalFormatted}
                </span>
              </h3>

              <Button
                disabled={!totalItems || isCreatingCheckoutSession}
                onClick={handleBuyButton}
              >
                Finalizar compra
              </Button>
            </Footer>
          </>
        ) : (
          <EmptyCart>
            <Image src={bagActiveIcon} width={80} alt="" />
            Carrinho vazio
          </EmptyCart>
        )}
    </Content>
  </Container>

}
