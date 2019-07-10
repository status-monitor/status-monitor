import React, { ReactElement, useEffect, useState } from 'react';
import { StatelessPage } from '@app/models/page';
import { Button } from '@app/shared/button';
import { useWebsitesStore, useConfirmStore } from '@app/stores';
import Router from 'next/router';
import { Container } from '@app/shared/container';
import { getWebsiteUrl } from '@common/utils/website';
import { WebsiteDialog } from '@app/components/dialogs/website-dialog';
import { useDialog } from '@app/shared/dialog';
import { Flex, FlexRow } from '@app/shared/flex';
import { getInfluxApi } from '@app/api';
import { HealthCheckStatus } from '@common/models/healthcheck-status';
import { DurationsChart } from '@app/components/graph/durations-chart';

interface WebsitePageProps {
  id: string;
}

const WebsitePage: StatelessPage<WebsitePageProps> = ({ id }): ReactElement => {
  const websitesStore = useWebsitesStore();
  const confirmStore = useConfirmStore();
  const [websiteDialogOpen, openWebsiteDialog, onCloseWebsiteDialog] = useDialog();
  const [data, setData] = useState<HealthCheckStatus[]>();

  const website = websitesStore.websites.find(w => w._id === id);

  useEffect(() => {
    const call = async () => {
      const statuses = await getInfluxApi(website._id);
      setData(statuses);
    };
    if (!process.browser || !website) {
      return;
    }
    const interval = setInterval(() => {
      call();
    }, 10000);
    call();

    return () => clearInterval(interval);
  }, [website]);

  if (!website) {
    return null;
  }

  return (
    <Container>
      <WebsiteDialog
        website={website}
        open={websiteDialogOpen}
        onClose={values => {
          if (values) {
            websitesStore.updateWebsite(website._id, values);
          }
          onCloseWebsiteDialog();
        }}
      />
      <FlexRow>
        <h1>
          {website.name} <small>{getWebsiteUrl(website)}</small>
        </h1>
        <Flex></Flex>
        <Button onClick={openWebsiteDialog} style={{ marginRight: 5 }}>
          Edit
        </Button>
        <Button
          onClick={() => {
            confirmStore.confirm(`Are you sure to delete ${website.name} ?`, () => {
              websitesStore.removeWebsite(website._id);
              Router.push('/');
            });
          }}
          theme="light"
        >
          Delete
        </Button>
      </FlexRow>

      <DurationsChart data={data} />
    </Container>
  );
};

WebsitePage.title = 'Website';

WebsitePage.getInitialProps = async ctx => {
  return {
    id: ctx.query.id as string,
  };
};

export default WebsitePage;
