import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { Website } from '@common/models/website';
import { Card } from '@app/shared/card';
import { getFormattedUptime } from '@app/utils/uptime';
import Router from 'next/router';

const StatusLineDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  line-height: 60px;
  color: #939abc;
  padding: 0 1rem;
  cursor: pointer;
`;

interface StatusIndicatorDivProps {
  status: 'success' | 'error';
}

const StatusIndicatorDiv = styled.div`
  &:before {
    content: ' ';
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    margin-right: 1rem;
    border: 1px solid #000;
  }

  ${({ status }: StatusIndicatorDivProps) =>
    status === 'success' &&
    css`
      &:before {
        background-color: #29c0b1;
        border-color: #28bac0;
        box-shadow: 0px 0px 4px 1px #29c0b1;
      }
    `}

  ${({ status }: StatusIndicatorDivProps) =>
    status === 'error' &&
    css`
      &:before {
        background-color: #ff3366;
        border-color: #ff3239;
        box-shadow: 0px 0px 4px 1px #ff3366;
      }
    `}
`;

const StatusNameDiv = styled.div`
  width: 30px;
  flex: 1;
  font-size: 1.15rem;
`;

const StatusDurationDiv = styled.div`
  font-size: 0.95rem;
  text-align: right;
`;

const StatusUptimeDiv = styled.div`
  width: 140px;
  text-align: right;
`;

export const WebsiteStatus: React.FC<{ website: Website }> = ({ website }): ReactElement => {
  return (
    <Card onClick={() => Router.push(`/website?id=${website._id}`)}>
      <StatusLineDiv>
        <StatusIndicatorDiv status={website.isAlive ? 'success' : 'error'} />
        <StatusNameDiv>{website.name}</StatusNameDiv>
        {website.status && <StatusDurationDiv>{website.status.duration}ms</StatusDurationDiv>}
        {website.status && <StatusUptimeDiv>{getFormattedUptime(website.status.uptime)} up</StatusUptimeDiv>}
      </StatusLineDiv>
    </Card>
  );
};
