import { Path } from 'react-hook-form';

import type { ComponentPropsWithoutRef } from 'react';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { TFieldNames } from 'types';

type TextFieldProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    register: UseFormRegister<T>;
    name: TFieldNames;
  };

export const TextField = <T extends FieldValues>({
  register,
  name,
  type = 'text',
  ...rest
}: TextFieldProps<T>) => (
  <input type={type} {...register(name as Path<T>)} {...rest} />
);
