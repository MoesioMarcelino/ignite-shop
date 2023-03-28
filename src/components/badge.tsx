import { HTMLAttributes } from 'react'
import { Container } from "@/styles/components/badge";
import Image, { StaticImageData } from "next/image";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  icon: StaticImageData
  count: number
}

export function Badge({ icon, count, ...props }: BadgeProps) {
  return <Container {...props}>
    <Image src={icon} alt="" />
    {count > 0 && <span>{count}</span>}
  </Container>;
}