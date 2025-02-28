import * as React from 'react';
import { Input } from './input';
import { InputBaseVariantsProp } from './input.utils';

export interface InputTemplateProps {
  startSlot?: React.ReactNode | null;
  endSlot?: React.ReactNode | null;
  disabled?: boolean;
  placeholder?: string;
  triggerSizes: InputBaseVariantsProp['size'];
  triggerModes: InputBaseVariantsProp['mode'];
}

export const InputTemplate: React.FC<InputTemplateProps> = ({
  startSlot = null,
  endSlot = null,
  disabled = false,
  placeholder = 'Placeholder',
  triggerSizes,
  triggerModes,
}) => {
  return (
    <div className="w-[320px]">
      <Input
        endSlot={endSlot}
        startSlot={startSlot}
        mode={triggerModes}
        size={triggerSizes}
        disabled={disabled}
        placeholder={placeholder}
        containerProps={{
          className: 'w-[320px]',
          'aria-disabled': disabled,
        }}
      />
    </div>
  );
};
