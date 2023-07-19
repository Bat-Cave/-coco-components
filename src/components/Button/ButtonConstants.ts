import { type MouseEventHandler } from 'react';
import { AriaButtonProps } from 'react-aria';

export enum ButtonVariant {
  solid = 'solid',
  outlined = 'outlined',
  text = 'text',
}

export enum ButtonSize {
  small = 'small',
  large = 'large',
  full = 'full',
}

export type ButtonSizes = {
  [key in ButtonSize]: string;
};

export type ButtonStates = {
  [key in ButtonVariant]: {
    base: string;
    hover: string;
    disabled: string;
    pressed: string;
    focus: string;
  };
};
export interface ButtonProps
  extends Omit<AriaButtonProps<'button'>, 'onClick'> {
  /**
   * Is the Button in the loading state?
   */
  isLoading?: boolean;

  /**
   * Additional class names to apply to the button
   */
  disabled?: boolean;

  /**
   * Additional class names to apply to the button
   */
  className?: string;

  /**
   * Variant of the button. Applies preset classes based on variant
   */
  variant?: keyof typeof ButtonVariant;

  /**
   * The size of the button
   */
  size?: keyof typeof ButtonSize;

  /**
   * What should happen when the button is clicked?
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
