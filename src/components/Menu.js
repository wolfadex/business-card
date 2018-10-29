import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = styled('button')`
  border-radius: 10rem;
  bottom: 3rem;
  position: absolute;
  right: 3rem;
  transition: bottom 0.25s;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  padding: 0;
  font-size: 2rem;
`;

export default ({ actions = [] }) => {
  const [isOpen, setOpen] = useState(false);
  const actionCount = actions.length;

  return (
    <>
      <Button
        className={css`
          z-index: ${actionCount + 1};
        `}
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <FontAwesomeIcon icon={isOpen ? 'times' : 'bars'} />
      </Button>
      <>
        {actions.map(({ id, onClick, icon }, index) => (
          <Button
            key={id}
            className={css`
              bottom: ${isOpen ? (index + 2) * 5 : 3}rem;
              z-index: ${actionCount - index};
            `}
            onClick={() => {
              setOpen(false);
              onClick && onClick();
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </Button>
        ))}
      </>
    </>
  );
};
