import { formFieldNames } from '@constants';

import type { ComponentPropsWithoutRef } from 'react';
import type { UseFormRegister, FieldValues } from 'react-hook-form';

type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  register: UseFormRegister<FieldValues>;
  name: (typeof formFieldNames)[keyof typeof formFieldNames];
};

export const TextField = ({ register, name, ...rest }: TextFieldProps) => (
  <input {...register(name)} {...rest} />
);
