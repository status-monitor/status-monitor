import React, { ReactElement } from 'react';
import { StatelessPage } from '@app/models/page';
import { useWebsitesStore } from '@app/stores';

const WebsitesPage: StatelessPage = (): ReactElement => {
  const { websites } = useWebsitesStore();

  if (!websites) {
    return null;
  }

  return (
    <>
      <h1>Websites</h1>
      {websites.map(website => (
        <div key={website._id}>{website.host}</div>
      ))}
    </>
  );
};

WebsitesPage.title = 'Websites';

export default WebsitesPage;
