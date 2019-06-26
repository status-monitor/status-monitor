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
import { Chart } from '@app/shared/graph/chart';
import { Chart2 } from '@app/shared/graph/chart2';
import { getInfluxApi } from '@app/api';
import moment from 'moment';

interface WebsitePageProps {
  id: string;
}

const WebsitePage: StatelessPage<WebsitePageProps> = ({ id }): ReactElement => {
  const websitesStore = useWebsitesStore();
  const confirmStore = useConfirmStore();
  const [websiteDialogOpen, openWebsiteDialog, onCloseWebsiteDialog] = useDialog();
  const [data, setData] = useState();

  const website = websitesStore.websites.find(w => w._id === id);

  useEffect(() => {
    const call = async () => {
      const { statuses } = await getInfluxApi(website._id);
      setData(statuses); //.map(d => ({ Rasoul: d }))
      // console.log(statuses.map(s => ({ x: s.time, y: s.duration })) }))
      // setData([
      //   {
      //     id: 'App',
      //     color: 'blue',
      //     data: statuses.map((s, index) => {
      //       // console.log(moment(s.time).format('YYYY-MM-DD HH:MM:SS'));
      //       return { x: s.time, y: s.duration };
      //     }),
      //   },
      // ]); //.map(d => ({ Rasoul: d }))
    };
    if (!process.browser || !website) {
      return;
    }
    // setInterval(() => {
    //   call();
    // }, 10000);
    call();
  }, [website]);

  if (!website) {
    return null;
  }
  if (data) {
    console.log(data);
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

      {/* <Chart2 data={data} /> */}
    </Container>
  );
};

WebsitePage.title = 'Website';

WebsitePage.getInitialProps = async (ctx, _) => {
  return {
    id: ctx.query.id as string,
  };
};

export default WebsitePage;
