import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { Website } from '@common/models/website';
import { Card } from '@app/shared/card';
import { getFormattedUptime } from '@app/utils/uptime';
import Router from 'next/router';
import { green, red } from '@app/styles/variables';

const StatusLineDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  line-height: 60px;
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
    width: 18px;
    height: 18px;
    border-radius: 18px;
    margin-right: 1rem;
    position: relative;
    top: 3px;
  }

  ${({ status }: StatusIndicatorDivProps) =>
    status === 'success' &&
    css`
      &:before {
        background-color: ${green};
      }
    `}

  ${({ status }: StatusIndicatorDivProps) =>
    status === 'error' &&
    css`
      &:before {
        background-color: ${red};
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
        <StatusNameDiv>
          {website.name} <small>{website.protocol}://{website.host}{website.path}</small>
        </StatusNameDiv>
        {website.status && website.status.duration && (
          <StatusDurationDiv>{website.status.duration}ms</StatusDurationDiv>
        )}
        {website.status && <StatusUptimeDiv>{getFormattedUptime(website.status.uptime)} up</StatusUptimeDiv>}
      </StatusLineDiv>
    </Card>
  );
};
