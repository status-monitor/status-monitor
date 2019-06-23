import React, { ReactElement } from 'react';
import { StatelessPage } from '@app/models/page';
import { Container } from '@app/shared/container';
import { useWebsitesStore } from '@app/stores';
import { WebsiteStatus } from '@app/components/website-status';
import { observer } from 'mobx-react-lite';
import { Button } from '@app/shared/button';
import { WebsiteDialog } from '@app/components/dialogs/website-dialog';
import { useDialog } from '@app/shared/dialog';

const IndexPage: StatelessPage = observer(
  (): ReactElement => {
    const websitesStore = useWebsitesStore();
    const [websiteDialogOpen, openWebsiteDialog, onCloseWebsiteDialog] = useDialog();

    if (!websitesStore.websites) {
      return null;
    }

    return (
      <Container>
        <WebsiteDialog open={websiteDialogOpen} onClose={onCloseWebsiteDialog} />
        <Button onClick={openWebsiteDialog}>Add a new website</Button>
        {/* <Button
          onClick={() => websitesStore.addWebsite({ host: 'ocean.io', name: 'Ocean', path: '/', protocol: 'http' })}
        >
          Ocean.io
        </Button>{' '}
        <Button
          theme="light"
          onClick={() =>
            websitesStore.addWebsite({
              host: 'app.ocean.io',
              name: 'App Ocean',
              path: '/healthcheck',
              protocol: 'http',
            })
          }
        >
          App.Ocean.io
        </Button>{' '}
        <Button
          onClick={() =>
            websitesStore.addWebsite({
              host: 'localhost:8000',
              name: 'Localhost',
              path: '/',
              protocol: 'http',
            })
          }
        >
          Localhost
        </Button> */}
        {websitesStore.websites.map(website => (
          <WebsiteStatus website={website} key={website._id} />
        ))}
      </Container>
    );
  },
);

IndexPage.title = 'Dashboard';

export default IndexPage;
