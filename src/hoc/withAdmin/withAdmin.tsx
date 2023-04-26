import {
  AuthAction,
  PageURL,
  useAuthUser,
  withAuthUser,
} from 'next-firebase-auth';
import React, { ComponentType, FC, useEffect } from 'react';
import { useRouter } from 'next/router';

interface IWithAuthUserOptions {
  whenAuthed?: AuthAction.RENDER | AuthAction.REDIRECT_TO_APP;
  whenAuthedBeforeRedirect?:
    | AuthAction.RENDER
    | AuthAction.SHOW_LOADER
    | AuthAction.RETURN_NULL;
  whenUnauthedBeforeInit?:
    | AuthAction.RENDER
    | AuthAction.REDIRECT_TO_LOGIN
    | AuthAction.SHOW_LOADER
    | AuthAction.RETURN_NULL;
  whenUnauthedAfterInit?: AuthAction.RENDER | AuthAction.REDIRECT_TO_LOGIN;
  appPageURL?: PageURL;
  authPageURL?: PageURL;
  LoaderComponent?: ComponentType | null;
}

export const withAdmin =
  // eslint-disable-next-line unused-imports/no-unused-vars
    <P extends object>(_options?: IWithAuthUserOptions) =>
    (ChildComponent: ComponentType<P>) => {
      const WithVerifiedAuthUserHOC: FC<unknown> = (props) => {
        const AuthUser = useAuthUser();
        const router = useRouter();

        useEffect(() => {
          if (!!AuthUser.id && !AuthUser.claims.admin) {
            router.replace('/verify');
          }
        }, [router, AuthUser]);

        return <ChildComponent {...(props as P)} />;
      };

      WithVerifiedAuthUserHOC.displayName = 'WithAuthUserHOC';

      return withAuthUser()(WithVerifiedAuthUserHOC);
    };

