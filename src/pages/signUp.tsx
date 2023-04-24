import { withAuthUser } from 'next-firebase-auth';
import Link from 'next/link';

import { MainLayout } from 'layouts';
import { AuthForm } from 'components';
import { useSignUp } from 'hooks';
import { routes } from '@constants';

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
      <Link href={routes.auth}>Login</Link>
    </MainLayout>
  );
};

export default withAuthUser()(SignUp);
