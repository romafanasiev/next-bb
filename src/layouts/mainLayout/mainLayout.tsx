import { NavBar } from 'modules';
import { Footer } from 'components';

import type { PropsWithChildren } from 'react';

export const MainLayout = (props: PropsWithChildren) => (
  <div className="flex h-screen w-screen flex-col justify-between bg-additional">
    <NavBar />
    <main className="m-auto flex h-full w-full max-w-[80%] flex-col justify-center text-center">
      {props.children}
    </main>
    <Footer />
  </div>
);
