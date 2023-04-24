import { useForm } from 'react-hook-form';

import { formFieldNames } from '@constants';
import { TextField } from 'components';

import type { TAuthForm } from 'types';
import type { SubmitHandler } from 'react-hook-form';

interface AuthFormProps {
  onSubmit: SubmitHandler<TAuthForm>;
  buttonText?: string;
}

export const AuthForm = ({
  onSubmit,
  buttonText = 'submit',
}: AuthFormProps) => {
  const { register, handleSubmit } = useForm<TAuthForm>();

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
