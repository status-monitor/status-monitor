import React, { ReactElement } from 'react';
import { StatelessPage } from '@app/models/page';
import { Button } from '@app/shared/button';
import { useWebsitesStore } from '@app/stores';
import Router from 'next/router';
import { Container } from '@app/shared/container';
import { getWebsiteUrl } from '@common/utils/website';
import { WebsiteDialog } from '@app/components/dialogs/website-dialog';
import { useDialog } from '@app/shared/dialog';

interface WebsitePageProps {
  id: string;
}

const WebsitePage: StatelessPage<WebsitePageProps> = ({ id }): ReactElement => {
  const websitesStore = useWebsitesStore();
  const [websiteDialogOpen, openWebsiteDialog, onCloseWebsiteDialog] = useDialog();

  const website = websitesStore.websites.find(w => w._id === id);
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
      <h1>
        {website.name} <small>{getWebsiteUrl(website)}</small>
      </h1>
      <Button onClick={openWebsiteDialog}>Edit website</Button>{' '}
      <Button
        onClick={() => {
          websitesStore.removeWebsite(website._id);
          Router.push('/');
        }}
        theme="danger"
      >
        Delete website
      </Button>
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
