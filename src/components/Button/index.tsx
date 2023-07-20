import React, { forwardRef, ForwardedRef } from 'react';
import { FocusRing } from '@react-aria/focus';
import { ButtonProps } from './ButtonConstants';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import type {} from "class-variance-authority/node_modules/clsx";

const buttonVariants = cva(
  'flex select-none items-center justify-center rounded-full font-sans transition duration-200 focus:outline-none font-semibold',
  {
    variants: {
      variant: {
        solid:
          'shadow text-white border px-2 hover:border-violet-600 hover:bg-violet-600 disabled:bg-grey-400 disabled:border-grey-400 bg-violet-500 border-violet-500 active:border-violet-600 active:bg-violet-600',
        outlined:
          'shadow bg-white border-2 px-2 border-violet-500 text-violet-500 hover:text-violet-900 disabled:text-grey-400 disabled:border-grey-400 active:text-violet-900',
        text:
          'text-violet-500 rounded-none border-0 h-auto w-auto hover:text-violet-900 active:text-violet-900 disabled:text-grey-400',
      },
      size: {
        large: 'w-full max-w-[250px] py-2 px-4',
        small: 'w-auto max-w-none py-1 px-2',
        full: 'w-full py-2 px-4',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'large',
    },
    compoundVariants: [
      {
        variant: 'text',
        className: 'h-auto w-auto max-w-none p-0',
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
          `active:ring-violet-600 ring-violet-500`,
          `hover:ring-violet-600 ring-1 ring-offset-2 ring-offset-white`
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
          {children}
        </button>
      </FocusRing>
    );
  }
);

export default Button;
export { buttonVariants };
