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
        <WebsiteDialog
          open={websiteDialogOpen}
          onClose={values => {
            if (values) {
              websitesStore.addWebsite(values);
            }
            onCloseWebsiteDialog();
          }}
        />
        <Button onClick={openWebsiteDialog}>Add a new website</Button>
        {websitesStore.websites.map(website => (
          <WebsiteStatus website={website} key={website._id} />
        ))}
      </Container>
    );
  },
);

IndexPage.title = 'Dashboard';

export default IndexPage;
