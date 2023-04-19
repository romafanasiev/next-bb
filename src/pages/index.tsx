import {
  useAuthSignInWithEmailAndPassword,
  useAuthSignInWithPopup,
  useAuthSignOut,
} from '@react-query-firebase/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { firebaseAuth, googleProvider } from 'utils';
import { MainLayout } from 'layouts';

const Home = () => {
  const user = useAuthUser();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const mutation = useAuthSignInWithEmailAndPassword(firebaseAuth, {
    onError() {
      toast.error('Could not sign you in!');
    },
    onSuccess() {
      router.push('/users');
    },
  });

  const mutationWithGoogle = useAuthSignInWithPopup(firebaseAuth, {
    onSuccess() {
      router.push('/users');
    },
  });

  const signOut = useAuthSignOut(firebaseAuth);

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  const onSubmitGoogle = () => {
    mutationWithGoogle.mutate({
      provider: googleProvider,
    });
  };

  return (
    <MainLayout user={user}>
      <div className="bg-slate-400 p-10">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input type="email" {...register('email')} />
          <input type="password" {...register('password')} />
          <button type="submit">login</button>
          <button type="button" onClick={onSubmitGoogle}>
            google
          </button>
          <button type="button" onClick={() => signOut.mutate()}>
            signout
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default withAuthUser()(Home);
