import type { AppProps } from 'next/app'

import { globalStyles } from '@/styles/globals'
import { Container } from '@/styles/pages/app'

import { AppProvider } from '@/contexts'
import { Cart, Header } from '@/components'

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Container>
        <Header />
        <Cart />
        <Component {...pageProps} />
      </Container>
    </AppProvider>
  )
}

export default App