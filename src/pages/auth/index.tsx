import { withAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useAuthSignInWithPopup } from '@react-query-firebase/auth';
import Link from 'next/link';

import { routes } from '@constants';
import { AuthForm } from 'components';
import { MainLayout } from 'layouts';
import { useLogin } from 'hooks';
import { firebaseAuth, googleProvider } from 'utils';

import type { TAuthForm } from 'types';

const {
  users: { root },
  default: { signUp },
} = routes;

const LoginPage = () => {
  const login = useLogin();
  const router = useRouter();
  const mutationWithGoogle = useAuthSignInWithPopup(firebaseAuth, {
    onSuccess() {
      router.push(root);
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
      <Link href={signUp}>SignUp</Link>
    </MainLayout>
  );
};

export default withAuthUser()(LoginPage);
