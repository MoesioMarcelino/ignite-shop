import Image from "next/image"
import Head from 'next/head'
import { GetStaticProps } from "next"
import Link from "next/link"
import { MouseEvent } from 'react'

import Stripe from "stripe"
import { useKeenSlider } from 'keen-slider/react'

import { bagActiveIcon } from "@/assets"
import { stripe } from "@/lib/stripe"
import { HomeContainer, Product } from "@/styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import { useCart } from "@/contexts/cart"
import { ProductType } from "@/interfaces"

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const { addProduct } = useCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    loop: true
  });

  function addNewProduct(e: MouseEvent<HTMLImageElement>, product: ProductType) {
    e.preventDefault()

    addProduct(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                  <Image
                    src={bagActiveIcon}
                    alt=""
                    onClick={(e) => addNewProduct(e, product)}
                  />
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    if (!price.unit_amount) {
      return {}
    }

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      description: product.description,
      defaultPriceId: price.id,
      priceUnit: price.unit_amount
    } as ProductType
  })

  return {
    props: {
      products
    } as HomeProps,
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}
