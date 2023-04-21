import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';
import { AuthForm } from 'components';
import { useSignUp } from 'hooks';

import type { TAuthForm } from 'types';

const SignUp = () => {
  const createUser = useSignUp();

  const onSubmit = (data: TAuthForm) => {
    createUser.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <MainLayout>
      <AuthForm onSubmit={onSubmit} />
    </MainLayout>
  );
};

export default withAuthUser()(SignUp);
