export const sideBarStyles = {
  base: 'absolute flex h-full flex-col items-center justify-between rounded-br-3xl bg-primary p-4 text-white duration-300',
  opened: 'w-[--sidebar-size]',
  closed: 'w-[--sidebar-sm-size]',
};

export const linkStyles = {
  base: 'w-full flex items-center capitalize',
  opened: 'justify-end',
  closed: 'justify-center',
};

export const buttonStyles = {
  base: 'duration-300 ease-in-out',
  opened: 'rotate-180',
  closed: 'rotate-0',
};

export const descStyles = {
  base: 'transform duration-1000 px-4',
  opened: 'translate-x-0',
  closed: 'translate-x-[-200px] scale-0 absolute',
};

export const liStyles = {
  base: 'w-full flex items-center ',
  opened: 'justify-start',
  closed: 'justify-center',
};
