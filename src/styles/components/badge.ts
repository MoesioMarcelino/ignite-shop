import { styled } from "..";

export const Container = styled('div', {
  position: 'relative',
  padding: '1rem 0.5rem',
  cursor: 'pointer',

  span: {
    position: 'absolute',
    top: '4px',
    right: '-4px',
    border: '3px solid $gray900',
    backgroundColor: '$green300',
    fontWeight: 'bold',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',

    height: '30px',
    width: '30px',
  }
})