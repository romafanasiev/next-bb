import { FC } from 'react';

import type { ButtonHTMLAttributes } from 'react';

const buttonVariants = {
  primary: '',
  secondary: 'bg-additional p-2 text-primary rounded-lg',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
}

export const Button: FC<ButtonProps> = ({ children, variant = 'primary', ...rest }) => (
  <button {...rest} className={buttonVariants[variant]}>
    {children}
  </button>
);
