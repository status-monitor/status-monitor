import React from 'react';
import App, { Container } from 'next/app';
import { Normalize } from 'styled-normalize';

import { AppLayout } from '@app/layout';
import { Head } from '@app/layout/head';
import { initializeStore, RootStore, RootStoreContext } from '@app/stores/root-store';
import { GlobalStyle } from '@app/styles/global';
import { api } from '@app/api/api';
import { NextPageContext } from 'next';

interface MyAppProps {
  title: string;
}

class MyApp extends App<MyAppProps> {
  // TODOTS
  public static async getInitialProps({ Component, ctx }: { Component: any; ctx: NextPageContext }) {
    let pageProps: any = {};

    const rootStore = initializeStore();

    if (ctx.req) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const req: any = ctx.req;
      api.baseUrl = `${req.protocol}://${req.get('Host')}`;
    }

    await rootStore.websitesStore.getWebsites(true);
    await rootStore.scenariosStore.getScenarios(true);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx, rootStore);
    }

    pageProps.rootStoreJson = rootStore.toJson();

    const title = Component.getTitle ? await Component.getTitle(pageProps) : Component.title;

    return { pageProps, title };
  }

  public rootStore: RootStore;

  public constructor(props: any) {
    super(props);
    this.rootStore = initializeStore(props.pageProps.rootStoreJson);
  }

  public render() {
    const { Component, pageProps, title } = this.props;

    return (
      <Container>
        <GlobalStyle />
        <Normalize />
        <RootStoreContext.Provider value={this.rootStore}>
          <Head title={title}>{(Component as any).head}</Head>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </RootStoreContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
