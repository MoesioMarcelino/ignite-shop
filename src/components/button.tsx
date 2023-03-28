import { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from '@/styles/components/button'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({ children, ...props }: ButtonProps) {
  return <ButtonContainer {...props}>{children}</ButtonContainer>
}