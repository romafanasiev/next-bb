import { useAuthCreateUserWithEmailAndPassword } from '@react-query-firebase/auth';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { errorMessages, routes, messages } from '@constants';
import { firebaseAuth } from 'utils';

import type { TAuthForm } from 'types';
import type { AuthError } from 'firebase/auth';

const { signUpErr, connectionErr } = errorMessages;

export const useSignUp = () => {
  const router = useRouter();

  const createUser = useAuthCreateUserWithEmailAndPassword(firebaseAuth);

  const createAndUpdateUser = useMutation(
    async (data: TAuthForm) => {
      const res = await createUser.mutateAsync({
        email: data.email,
        password: data.password,
      });

      return res;
    },
    {
      onError: (error: AuthError) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error(signUpErr);
        } else {
          toast.error(connectionErr);
        }
      },
      onSuccess: () => {
        toast.success(messages.congratulation);
        router.push(routes.root);
        // router.push(routes.auth);
      },
    },
  );

  return createAndUpdateUser;
};
