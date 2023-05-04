import { Sidebar } from 'components';
import { NavBar } from 'modules';

import type { PropsWithChildren } from 'react';

export const AdminLayout = (props: PropsWithChildren) => (
  <div className="flex h-screen w-screen flex-col bg-additional">
    <NavBar />
    <div className="relative flex grow">
      <Sidebar />
      <main className="flex w-full flex-col items-center justify-center gap-4">
        {props.children}
      </main>
    </div>
  </div>
);
