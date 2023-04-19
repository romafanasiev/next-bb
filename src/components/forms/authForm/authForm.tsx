import { useForm } from 'react-hook-form';

import { formFieldNames } from '@constants';
import { TextField } from 'components';

export const AuthForm = (props: { onSubmit: () => void }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <TextField type="email" register={register} name={formFieldNames.email} />
      <TextField
        type="password"
        register={register}
        name={formFieldNames.password}
      />
      <button type="submit">login</button>
    </form>
  );
};
