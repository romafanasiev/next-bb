import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { firebaseAuth } from 'utils';
import { errorMessages, routes, messages } from '@constants';

const { logInErr, connectionErr } = errorMessages;

export const useLogin = () => {
  const router = useRouter();

  const login = useAuthSignInWithEmailAndPassword(firebaseAuth, {
    onSuccess: () => {
      toast.success(messages.congratulation);
      router.push(routes.default.root);
    },
    onError: (error) => {
      switch (error.code) {
        case 'auth/wrong-password' || 'auth/user-not-found':
          toast.error(logInErr);
          break;
        default:
          toast.error(connectionErr);
          break;
      }
    },
  });

  return login;
};
