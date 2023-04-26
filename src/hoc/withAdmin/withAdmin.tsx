import { ComponentType, FC, useEffect } from 'react';
import {
  AuthAction,
  PageURL,
  useAuthUser,
  withAuthUser,
} from 'next-firebase-auth';
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
      const WithAdminHOC: FC<unknown> = (props) => {
        const AuthUser = useAuthUser();
        const router = useRouter();

        useEffect(() => {
          if (!!AuthUser.id && !AuthUser.claims.admin) {
            router.replace('/');
          }
        }, [router, AuthUser]);

        if (!AuthUser) {
          return <p>Loading</p>;
        }

        return <ChildComponent {...(props as P)} />;
      };

      return withAuthUser()(WithAdminHOC);
    };
