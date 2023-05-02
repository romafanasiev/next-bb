import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formFieldNames } from '@constants';
import { TextField } from 'components';

import type { IFormProps, TAuthForm } from 'types';
interface IAuthFormProps extends IFormProps<TAuthForm> {
  buttonText?: string;
}

export const AuthForm = ({
  onSubmit,
  validation,
  buttonText = 'submit',
}: IAuthFormProps) => {
  const { register, handleSubmit } = useForm<TAuthForm>({
    resolver: validation && zodResolver(validation),
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <TextField type="email" register={register} name={formFieldNames.email} />
      <TextField
        type="password"
        register={register}
        name={formFieldNames.password}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};
