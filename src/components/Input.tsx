import { ComponentProps, forwardRef } from 'react'

export interface InputProps extends ComponentProps<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-600 focus:ring-offset-0 ${className}`}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input


