import { NavBar } from 'modules';
import { Footer } from 'components';

import type { PropsWithChildren } from 'react';

export const MainLayout = (props: PropsWithChildren) => (
  <div className="flex h-screen w-screen flex-col justify-between">
    <NavBar />
    <main className="flex h-full justify-center bg-additional">
      {props.children}
    </main>
    <Footer />
  </div>
);
