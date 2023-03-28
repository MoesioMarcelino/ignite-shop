import Image from 'next/image'
import { useRouter } from 'next/router'

import { bagIcon, logoIcon } from '@/assets'
import { Badge } from '@/components'
import { useCart } from '@/contexts/cart'

import { Container } from '@/styles/components/header'

export function Header() {
  const { cartList, toggleCart } = useCart()
  const router = useRouter()

  return (
    <Container>
      <Image src={logoIcon} alt="" onClick={() => router.push('/')} />
      <Badge icon={bagIcon} count={cartList.length} onClick={toggleCart} />
    </Container>
  )
}