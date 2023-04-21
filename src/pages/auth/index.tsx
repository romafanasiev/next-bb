import { withAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useAuthSignInWithPopup } from '@react-query-firebase/auth';

import { AuthForm } from 'components';
import { MainLayout } from 'layouts';
import { useLogin } from 'hooks';
import { firebaseAuth, googleProvider } from 'utils';

import type { TAuthForm } from 'types';

const LoginPage = () => {
  const login = useLogin();
  const router = useRouter();
  const mutationWithGoogle = useAuthSignInWithPopup(firebaseAuth, {
    onSuccess() {
      router.push('/users');
    },
  });

  const onSubmit = (data: TAuthForm) => {
    login.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const onSubmitGoogle = () => {
    mutationWithGoogle.mutate({
      provider: googleProvider,
    });
  };

  return (
    <MainLayout>
      <AuthForm onSubmit={onSubmit} buttonText="login" />
      <button onClick={onSubmitGoogle}>google</button>
    </MainLayout>
  );
};

export default withAuthUser()(LoginPage);
