import { routes } from '@constants';

import type { AuthUser } from 'next-firebase-auth';

export const protectedPages = (user: AuthUser) => {
  if (!user.claims.admin) {
    return {
      redirect: {
        destination: routes.default.root,
        permanent: false,
      },
    } as any;
  }
};
