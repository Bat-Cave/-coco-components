import React, { forwardRef, type ForwardedRef } from 'react';
import { FocusRing } from '@react-aria/focus';
import { ButtonProps } from './ButtonConstants';
import {twMerge} from 'tailwind-merge';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'flex select-none items-center justify-center rounded-full font-sans transition duration-200 focus:outline-none',
  {
    variants: {
      variant: {
        solid:
          'shadow text-white border px-cove-2 hover:border-cove-navy-blue hover:bg-cove-navy-blue disabled:bg-cove-dark-grey disabled:border-cove-dark-grey bg-cove-blue border-cove-blue active:border-cove-navy-blue active:bg-cove-navy-blue',
        outlined:
          'shadow bg-white border-2 px-cove-2 border-cove-blue text-cove-blue hover:text-cove-navy-blue disabled:text-cove-dark-grey disabled:border-cove-dark-grey active:text-cove-navy-blue',
        text: 'text-cove-blue rounded-none border-0 h-auto w-auto hover:text-cove-navy-blue disabled:text-cove-dark-grey',
      },
      size: {
        large: 'h-cove-5 w-full max-w-button',
        small: 'h-cove-4 w-auto max-w-none',
        full: 'h-cove-5 w-full',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'large',
    },
    compoundVariants: [
      {
        variant: 'text',
        className: 'h-auto w-auto max-w-none',
      },
    ],
  }
);

const Button: React.FC<ButtonProps> = forwardRef(
  (
    {
      isLoading = false,
      disabled = false,
      variant = 'solid',
      size = 'large',
      className,
      children,
      onClick,
      ...props
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <FocusRing
        focusRingClass={twMerge(
          `active:ring-cove-navy-blue ring-cove-blue`,
          `hover:ring-cove-navy-blue ring-1 ring-offset-2 ring-offset-white`
        )}
      >
        <button
          ref={ref}
          className={twMerge(buttonVariants({ variant, size }), className)}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
          onClick={e => {
            if (isLoading) return;
            onClick?.(e);
          }}
          {...props}
          disabled={disabled || isLoading}
        >
            children
        </button>
      </FocusRing>
    );
  }
);

export default Button;
export { buttonVariants };
