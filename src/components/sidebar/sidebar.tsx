import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';

import { routes } from '@constants';

import UploadIcon from '../../assets/icons/upload.svg';
import DashBoardIcon from '../../assets/icons/chartBar.svg';
import MailIcon from '../../assets/icons/mail.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';
import NoteIcon from '../../assets/icons/note.svg';

import {
  linkStyles,
  sideBarStyles,
  buttonStyles,
  descStyles,
  liStyles,
} from './styles';

const {admin: { dashboard, mailing, update, upload },} = routes;

const cxSidebar = classNames.bind(sideBarStyles);
const cxLink = classNames.bind(linkStyles);
const cxButton = classNames.bind(buttonStyles);
const cxDesc = classNames.bind(descStyles);
const cxLi = classNames.bind(liStyles);

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = [cxSidebar, cxLink, cxButton, cxDesc, cxLi];
  const classesContext = classes.map((className) =>
    className({ base: true, opened: isOpen, closed: !isOpen }),
  );

  return (
    <aside className={classesContext[classes.indexOf(cxSidebar)]}>
      <ul className="flex w-full flex-col items-center justify-center gap-4">
        <li className={classesContext[classes.indexOf(cxLi)]}>
          <Link
            href={dashboard}
            className={classesContext[classes.indexOf(cxLink)]}
          >
            <DashBoardIcon />
            <span className={classesContext[classes.indexOf(cxDesc)]}>
              Dashboard
            </span>
          </Link>
        </li>
        <li className={classesContext[classes.indexOf(cxLi)]}>
          <Link
            href={mailing}
            className={classesContext[classes.indexOf(cxLink)]}
          >
            <MailIcon />
            <span className={classesContext[classes.indexOf(cxDesc)]}>
              Send mail
            </span>
          </Link>
        </li>
        <li className={classesContext[classes.indexOf(cxLi)]}>
          <Link
            href={update}
            className={classesContext[classes.indexOf(cxLink)]}
          >
            <NoteIcon />
            <span className={classesContext[classes.indexOf(cxDesc)]}>
              All tracks
            </span>
          </Link>
        </li>
        <li className={classesContext[classes.indexOf(cxLi)]}>
          <Link
            href={upload}
            className={classesContext[classes.indexOf(cxLink)]}
          >
            <UploadIcon />
            <span className={classesContext[classes.indexOf(cxDesc)]}>
              Add new track
            </span>
          </Link>
        </li>
      </ul>
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className={classesContext[classes.indexOf(cxButton)]}
      >
        <ArrowIcon />
      </button>
    </aside>
  );
};
