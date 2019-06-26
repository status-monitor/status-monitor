import React, { ReactElement, FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button } from './button';
import { appBarHeight } from '@app/styles/variables';
import { Card } from './card';
import { Container } from './container';

const StyledEmpty = styled.div`
  /* position: fixed; */
  height: calc(100vh - ${appBarHeight});
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
`;

interface EmptyProps {
  onClick: () => void;
  buttonText: string;
  title: string;
  subtitle?: string;
}

export const Empty: FunctionComponent<EmptyProps> = ({ onClick, title, buttonText, subtitle }): ReactElement => {
  return (
    <StyledEmpty>
      <Card>
        <Container>
          <h1>{title}</h1>
          {subtitle && (
            <h3>
              <small>{subtitle}</small>
            </h3>
          )}
          <Button onClick={onClick}>{buttonText}</Button>
        </Container>
      </Card>
    </StyledEmpty>
  );
};
