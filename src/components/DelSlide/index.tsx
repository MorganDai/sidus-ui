import * as React from 'react';
import { Icon } from '../index';
import { genClassName } from '../../utils/classNames';

import './index.scss';

const DelSlide = (props: {
  hideDelIcon?: false | undefined;
  children: any;
  doDelete?: (() => void) | undefined;
}) => {
  const { hideDelIcon = false, children, doDelete = () => {} } = props;
  const [opened, setOpened] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);

  const triggerOpen = () => {
    setOpened(true);
  };

  const triggerDelete = () => {
    const solveDelete = async () => {
      await doDelete();
    };

    solveDelete().then(() => {
      setDeleted(true);
      // setOpened(false);
    });
  };

  return (
    <div
      className={
        genClassName('del-slide_box') +
        ` ${opened ? 'open' : ''} ${deleted ? 'deleted' : ''}`
      }
    >
      <div className={genClassName('del-slide')}>
        {!hideDelIcon ? (
          <Icon
            name="delete"
            onClick={() => {
              triggerOpen();
            }}
          />
        ) : (
          ''
        )}
        <div className={genClassName('del-slide_content')}>{children}</div>
      </div>

      <div
        className={genClassName('del-slide_trash')}
        onClick={() => {
          triggerDelete();
        }}
      />
    </div>
  );
};

export default DelSlide;
