import {
  useAuthSignInWithEmailAndPassword,
  useAuthSignInWithPopup,
  useAuthSignOut,
} from '@react-query-firebase/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { withAuthUser } from 'next-firebase-auth';

import { firebaseAuth, googleProvider } from 'utils';
import { MainLayout } from 'layouts';

const Home = () => {
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

  // const usersCollection = collection(
  //   firestore,
  //   `users/${user ? user.uid : 'null'}/avatars`,
  // );
  // const mutation = useFirestoreCollectionMutation(usersCollection, {
  //   onError: () => {
  //     toast.error(errorMessages.connectionErr);
  //   },
  //   onSuccess: () => {
  //     toast.success(messages.updated);
  //     queryClient.clear();
  //   },
  // });

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
    <MainLayout>
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
