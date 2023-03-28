import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',

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
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },


})
