import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer, ImageListContainer } from "@/styles/pages/success";

interface SuccessProps {
  costumerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[]
}

export default function Success({ costumerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageListContainer>
          {products.map(({ imageUrl, name }) => (
            <ImageContainer key={name}>
              <Image
                src={imageUrl}
                width={120}
                height={110}
                alt={name}
              />
            </ImageContainer>
          ))}
        </ImageListContainer>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de <strong>{products.length} camiseta(s)</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  if (!session.customer_details || !session.line_items?.data[0].price) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const costumerName = session.customer_details.name;
  const products = session.line_items.data.map(({ price }) => {
    const product = price?.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      costumerName,
      products
    } as SuccessProps
  }
}
