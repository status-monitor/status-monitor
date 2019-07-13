import React, { ReactElement, FunctionComponent, memo } from 'react';
import styled, { css } from 'styled-components';
import { dialogXPadding } from './styles';
import { rem } from '@app/styles/mixins';

interface DialogBodyProps {
  withPadding?: boolean;
  className?: string;
  hasHeader?: boolean;
  hasFooter?: boolean;
}

const DialogBodyDiv = styled.div`
  overflow: auto;
  width: 100%;

  ${({ hasHeader }: DialogBodyProps) =>
    hasHeader
      ? css`
          margin-top: ${rem(90)};
        `
      : css`
          padding-top: ${rem(20)};
        `}

  ${({ hasFooter }: DialogBodyProps) =>
    hasFooter
      ? css`
          margin-bottom: ${rem(90)};
        `
      : css`
          padding-bottom: ${rem(20)};
        `}

  ${({ withPadding }: DialogBodyProps) =>
    withPadding &&
    css`
      padding-left: ${dialogXPadding};
      padding-right: ${dialogXPadding};
    `}
`;

export const DialogBody: FunctionComponent<DialogBodyProps> = memo(
  ({ children, withPadding, hasFooter, hasHeader }): ReactElement => {
    return (
      <DialogBodyDiv hasHeader={hasHeader} hasFooter={hasFooter} withPadding={withPadding}>
        {children}
      </DialogBodyDiv>
    );
  },
);

(DialogBody as any).componentName = 'DialogBody';
