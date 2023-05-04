import { useState } from 'react';
import classNames from 'classnames/bind';

import { routes } from '@constants';
import { classNamesContext } from 'helpers';

import UploadIcon from '../../assets/icons/upload.svg';
import DashBoardIcon from '../../assets/icons/chartBar.svg';
import MailIcon from '../../assets/icons/mail.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';
import NoteIcon from '../../assets/icons/note.svg';

import { sideBarStyles, buttonStyles } from './styles';
import { NavItem } from './components/navItem';

const {admin: { dashboard, mailing, update, upload },} = routes;

const cxSidebar = classNames.bind(sideBarStyles);
const cxButton = classNames.bind(buttonStyles);

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const classes = [cxSidebar, cxButton];
  const contextValues = {
    base: true,
    opened: isOpen,
    closed: !isOpen,
  };
  const classesContext = classNamesContext(classes, contextValues);

  return (
    <aside className={classesContext[classes.indexOf(cxSidebar)]}>
      <ul className="flex w-full flex-col items-center justify-center gap-4">
        <NavItem
          linkAddress={dashboard}
          context={contextValues}
          icon={<DashBoardIcon />}
          description="Dashboard"
        />

        <NavItem
          linkAddress={mailing}
          context={contextValues}
          icon={<MailIcon />}
          description="Send mail"
        />

        <NavItem
          linkAddress={update}
          context={contextValues}
          icon={<NoteIcon />}
          description="All tracks"
        />

        <NavItem
          linkAddress={upload}
          context={contextValues}
          icon={<UploadIcon />}
          description="Add new track"
        />
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
