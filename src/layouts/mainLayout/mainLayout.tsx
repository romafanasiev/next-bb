import { Footer, NavBar } from 'components';

import type { AuthUserContext } from 'next-firebase-auth';
import type { PropsWithChildren } from 'react';

type MainLayoutProps = PropsWithChildren & {
  user?: AuthUserContext;
};

export const MainLayout = (props: MainLayoutProps) => (
  <div className="flex h-screen w-screen flex-col justify-between">
    <NavBar user={props.user} />
    <main className="flex h-full justify-center bg-additional">
      {props.children}
    </main>
    <Footer />
  </div>
);
