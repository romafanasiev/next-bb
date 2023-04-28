import Link from 'next/link';
import classNames from 'classnames/bind';

import { descStyles, liStyles, linkStyles } from '../styles';

import type { ReactElement } from 'react';

interface TNavItemProps {
  linkAddress: string;
  isOpen: boolean;
  description: string;
  icon: ReactElement;
}

const cxLink = classNames.bind(linkStyles);
const cxLi = classNames.bind(liStyles);
const cxDesc = classNames.bind(descStyles);

export const NavItem = ({
  linkAddress,
  description,
  isOpen,
  icon,
}: TNavItemProps) => {
  const classes = [cxLink, cxLi, cxDesc];
  const classesContext = classes.map((className) =>
    className({ base: true, opened: isOpen, closed: !isOpen }),
  );

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
