import Link from 'next/link';
import classNames from 'classnames/bind';

import { classNamesContext } from 'helpers';

import { descStyles, liStyles, linkStyles } from '../styles';

import type { ReactElement } from 'react';
import type { IContextType, TAdminRoutes } from 'types';

interface TNavItemProps {
  linkAddress: TAdminRoutes;
  context: IContextType;
  description: string;
  icon: ReactElement;
}

const cxLink = classNames.bind(linkStyles);
const cxLi = classNames.bind(liStyles);
const cxDesc = classNames.bind(descStyles);

export const NavItem = ({
  linkAddress,
  description,
  context,
  icon,
}: TNavItemProps) => {
  const classes = [cxLink, cxLi, cxDesc];
  const classesContext = classNamesContext(classes, context);

  return (
    <li className={classesContext[classes.indexOf(cxLi)]}>
      <Link
        href={linkAddress}
        className={classesContext[classes.indexOf(cxLink)]}
      >
        {icon}
        <span className={classesContext[classes.indexOf(cxDesc)]}>
          {description}
        </span>
      </Link>
    </li>
  );
};
