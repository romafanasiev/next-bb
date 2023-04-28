import { useState } from 'react';
import classNames from 'classnames/bind';

import { routes } from '@constants';

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
  const classesContext = classes.map((className) =>
    className({ base: true, opened: isOpen, closed: !isOpen }),
  );

  return (
    <aside className={classesContext[classes.indexOf(cxSidebar)]}>
      <ul className="flex w-full flex-col items-center justify-center gap-4">
        <NavItem
          linkAddress={dashboard}
          isOpen={isOpen}
          icon={<DashBoardIcon />}
          description="Dashboard"
        />

        <NavItem
          linkAddress={mailing}
          isOpen={isOpen}
          icon={<MailIcon />}
          description="Send mail"
        />

        <NavItem
          linkAddress={update}
          isOpen={isOpen}
          icon={<NoteIcon />}
          description="All tracks"
        />

        <NavItem
          linkAddress={upload}
          isOpen={isOpen}
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
