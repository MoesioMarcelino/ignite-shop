import { styled, keyframes } from "..";

const appearCart = keyframes({
  "0%": { transform: 'translateX(100%)' },
  "100%": { transform: 'translateX(0)' },
})

const disappearCart = keyframes({
  "0%": { transform: 'translateX(0)' },
  "100%": { transform: 'translateX(100%)' },
})

export const Container = styled('div', {
  position: 'relative',
})

export const Backdrop = styled('div', {
  zIndex: 1,
  backgroundColor: '$gray900',
  width: '100vw',
  height: '100vh',

  position: 'fixed',
  top: 0,
  left: 0,

  opacity: 0.6,
})

export const Content = styled('div', {
  width: '480px',
  height: '100vh',
  zIndex: 2,
  backgroundColor: '$gray800',
  padding: '24px 48px',

  position: 'fixed',
  top: 0,
  right: 0,

  display: 'flex',
  flexDirection: 'column',
  gap: 40,

  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: '$gray500',
    fontSize: 30,
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(1.6)',
      transition: 'filter 0.2s',
    }
  },
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  overflow: 'auto',
  marginRight: '-40px',

  '&::-webkit-scrollbar': {
    width: '1em',
  },

  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px #121214'
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$green500',
    outline: '1px solid $green500',
    borderRadius: 30,
    transition: 'background 0.2s',

    '&:hover': {
      backgroundColor: '$green300',
    }
  }
})

export const Product = styled('div', {
  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: 20,

  img: {
    borderRadius: 8,
    background: '$backgroundImage',
    objectFit: 'cover'
  },

  section: {
    display: 'flex',
    flexDirection: 'column',

    h3: {
      fontWeight: 'normal',
      color: '$gray300'
    },

    p: {
      marginTop: 4,
      fontWeight: 'bold',
      color: '$gray100'
    },

    h4: {
      marginTop: 16,
      fontWeight: 'bold',
      color: '$green500',

      '&:hover': {
        filter: 'brightness(1.6)',
        transition: 'filter 0.2s',
      }
    }
  }
})

export const Footer = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  marginTop: 'auto',

  h4: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'normal',
    span: {}
  },

  h3: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 8,
    span: {}
  },

  button: {
    marginTop: 56
  }
})

export const EmptyCart = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 24,
  flex: 1,
  fontSize: '$2xl'
})