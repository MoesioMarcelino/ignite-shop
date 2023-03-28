import { styled } from "..";

export const Container = styled('header', {
  padding: '2rem 2rem 2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',

  img: {
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(0.9)',
      transition: 'filter 0.2s',
    }
  }
})