import React, { ReactElement } from 'react';
import { StatelessPage } from '@app/models/page';
import { Website } from '@common/models/website';
import { Button } from '@app/shared/button';
import { useWebsitesStore } from '@app/stores';
import Router from 'next/router';

interface WebsitePageProps {
  website?: Website;
}

const WebsitePage: StatelessPage<WebsitePageProps> = ({ website }): ReactElement => {
  const websitesStore = useWebsitesStore();

  if (!website) {
    return null;
  }

  return (
    <>
      <h1>{website.name}</h1>
      <Button
        onClick={() => {
          websitesStore.removeWebsite(website._id);
          Router.push('/');
        }}
        theme="danger"
      >
        Delete website
      </Button>
    </>
  );
};

WebsitePage.title = 'Website';

WebsitePage.getInitialProps = async (ctx, rootStore) => {
  const { websites } = rootStore.websitesStore;
  if (!websites) {
    return {};
  }
  return {
    website: websites.find(w => w._id === ctx.query.id),
  };
};

export default WebsitePage;
