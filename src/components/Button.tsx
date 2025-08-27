import type { ComponentProps } from 'react'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600',
  secondary:
    'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus-visible:outline-brand-600',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={
          `inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ` +
          className
        }
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export default Button


