import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Motion, spring } from 'react-motion';

const Button = styled('button')`
  border-radius: 10rem;
  bottom: 2rem;
  position: absolute;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  padding: 0;
  font-size: 2rem;
  border: none;
  border: 0.2rem solid ${({ theme: { primary } }) => primary};
  background-color: ${({ theme: { primary } }) => primary};
`;

const AnimatedButton = styled('button')`
  border-radius: 10rem;
  bottom: 2rem;
  position: absolute;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  padding: 0;
  font-size: 2rem;
  border: 0.2rem solid ${({ theme: { primary } }) => primary};
  background-color: ${({ theme: { secondary } }) => secondary};
  color: ${({ theme: { primary } }) => primary};
`;

export default ({ actions = [], signOut }) => {
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
          <Motion
            key={id}
            style={{ bottom: spring(isOpen ? (index + 2) * 5 - 3 : 2) }}
          >
            {({ bottom }) =>
              bottom > 2 && (
                <AnimatedButton
                  className={css`
                    bottom: ${bottom}rem;
                    z-index: ${actionCount - index};
                  `}
                  onClick={() => {
                    setOpen(false);
                    onClick && onClick();
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                </AnimatedButton>
              )
            }
          </Motion>
        ))}
        <Motion style={{ right: spring(isOpen ? 2 * 5 - 3 : 2) }}>
          {({ right }) =>
            right > 2 && (
              <AnimatedButton
                className={css`
                  right: ${right}rem;
                  z-index: ${actionCount};
                `}
                onClick={() => {
                  setOpen(false);
                  signOut && signOut();
                }}
              >
                <FontAwesomeIcon icon="sign-out-alt" />
              </AnimatedButton>
            )
          }
        </Motion>
      </>
    </>
  );
};
