'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

import { inputBaseVariants, InputBaseVariantsProp } from './input.utils';

export type InputWithVariantProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  InputBaseVariantsProp;

export type InputRootProps = React.HTMLAttributes<HTMLDivElement>;

const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('flex items-center', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

export type InputSlotProps = React.HTMLAttributes<HTMLDivElement>;

const InputSlot = React.forwardRef<HTMLDivElement, InputSlotProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex flex-shrink-0 items-center justify-center self-stretch text-primary',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

const BaseInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input ref={ref} {...props} />;
});

const InputWithoutSlot = React.forwardRef<
  HTMLInputElement,
  InputWithVariantProps
>(({ className, size, ...props }, ref) => {
  return (
    <BaseInput
      ref={ref}
      className={cn(
        'input-base',
        inputBaseVariants({
          className,
          size,
        })
      )}
      {...props}
    />
  );
});

export type InputContainerProps = InputRootProps & {
  containerRef?: React.Ref<HTMLDivElement>;
};

export interface InputWithSlotProps {
  startSlot?: React.ReactNode | null;
  startSlotProps?: InputSlotProps;
  endSlot?: React.ReactNode | null;
  endSlotProps?: InputSlotProps;
  containerProps?: InputContainerProps;
}

const InputWithSlot = React.forwardRef<
  HTMLInputElement,
  InputWithSlotProps & InputWithVariantProps
>(
  (
    {
      startSlot = null,
      endSlot = null,
      startSlotProps = {},
      endSlotProps = {},
      containerProps = {},
      className,
      mode = 'with-slots',
      size,
      ...inputProps
    },
    ref
  ) => {
    const {
      className: containerClassName,
      containerRef,
      ...restContainerProps
    } = containerProps;
    return (
      <InputRoot
        ref={containerRef}
        className={cn(
          'input-with-slots group',
          inputBaseVariants({
            className: containerClassName,
            size,
            mode,
          })
        )}
        {...restContainerProps}
      >
        {startSlot && <InputSlot {...startSlotProps}>{startSlot}</InputSlot>}

        <BaseInput
          ref={ref}
          className={cn(
            'w-full flex-1 border-none bg-transparent p-0 text-tertiary placeholder-tertiary outline-none focus-within:placeholder-primary focus:ring-0 group-hover:text-primary group-hover:placeholder-primary',
            className
          )}
          {...inputProps}
        />

        {endSlot && <InputSlot {...endSlotProps}>{endSlot}</InputSlot>}
      </InputRoot>
    );
  }
);

export type InputProps = InputWithVariantProps & InputWithSlotProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ startSlot, endSlot, containerProps, ...inputProps }, ref) => {
    if (startSlot || endSlot) {
      return (
        <InputWithSlot
          ref={ref}
          endSlot={endSlot}
          startSlot={startSlot}
          containerProps={containerProps}
          {...inputProps}
        />
      );
    }
    return <InputWithoutSlot ref={ref} {...inputProps} />;
  }
);

BaseInput.displayName = 'BaseInput';
InputRoot.displayName = 'InputRoot';
InputSlot.displayName = 'InputSlot';
InputWithoutSlot.displayName = 'InputWithoutSlot';
InputWithSlot.displayName = 'InputWithSlot';
Input.displayName = 'Input';

export {
  BaseInput,
  Input,
  InputRoot,
  InputSlot,
  InputWithoutSlot,
  InputWithSlot,
};
