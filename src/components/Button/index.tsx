import React, { forwardRef, ForwardedRef } from 'react';
import { FocusRing } from '@react-aria/focus';
import { ButtonProps } from './ButtonConstants';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'flex select-none items-center justify-center rounded-full font-sans transition duration-200 focus:outline-none',
  {
    variants: {
      variant: {
        solid:
          'shadow text-white border px-2 hover:border-violet-400 hover:bg-violet-400 disabled:bg-grey-400 disabled:border-grey-400 bg-violet-500 border-violet-500 active:border-violet-400 active:bg-violet-400',
        outlined:
          'shadow bg-white border-2 px-2 border-violet-500 text-violet-500 hover:text-violet-400 disabled:text-grey-400 disabled:border-grey-400 active:text-violet-400',
        text:
          'text-violet-500 rounded-none border-0 h-auto w-auto hover:text-violet-400 disabled:text-grey-400',
      },
      size: {
        large: 'w-full max-w-[300px]',
        small: 'w-auto max-w-none',
        full: 'w-full',
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
          `active:ring-violet-400 ring-violet-500`,
          `hover:ring-violet-400 ring-1 ring-offset-2 ring-offset-white`
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
