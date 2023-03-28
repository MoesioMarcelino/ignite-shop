import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image";
import Head from "next/head";
import Stripe from "stripe";

import { useCart } from "@/contexts/cart";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components";
import { ProductType } from "@/interfaces";

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { addProduct } = useCart()

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <Button onClick={() => addProduct(product)}>
            Comprar agora
          </Button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NbWCzr8eiZSwHQ' } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  if (!params?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  if (!price.unit_amount) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id
      } as ProductType
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}
