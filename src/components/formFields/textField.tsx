import { Path } from 'react-hook-form';

import { formFieldNames } from '@constants';

import type { ComponentPropsWithoutRef } from 'react';
import type { UseFormRegister, FieldValues } from 'react-hook-form';

type TextFieldProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    register: UseFormRegister<T>;
    name: (typeof formFieldNames)[keyof typeof formFieldNames];
  };

export const TextField = <T extends FieldValues>({
  register,
  name,
  ...rest
}: TextFieldProps<T>) => <input {...register(name as Path<T>)} {...rest} />;
