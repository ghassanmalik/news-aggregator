import { cva, VariantProps } from 'class-variance-authority';

export const inputBaseVariants = cva(
  'bg-fill-secondary hover:bg-fill-secondary-hover disabled:bg-fill-secondary-disabled',
  {
    variants: {
      mode: {
        'with-slots': 'focus-within:!bg-fill-secondary',
        'no-slots': '',
      },
      size: {
        sm: 'sm h-8 px-2.5 py-[7px] rounded-[10px] text-xs',
        md: 'md h-10 px-3.5 py-2.5 rounded-xl text-sm',
        lg: 'lg h-11 px-3.5 py-3 rounded-xl text-sm',
        xl: 'xl h-[52px] p-3.5 rounded-[14px] text-md',
        '2xl': '2xl h-[72px] p-4 rounded-3xl text-base',
      },
    },
    defaultVariants: {
      size: 'md',
      mode: 'no-slots',
    },
  }
);

export type InputBaseVariantsProp = VariantProps<typeof inputBaseVariants>;
