import React from 'react';
import App, { Container } from 'next/app';

import { AppLayout } from '@app/layout';
import { Head } from '@app/layout/head';
import { initializeStore, RootStore, RootStoreContext } from '@app/stores/root-store';

interface MyAppProps {
  title: string;
}

class MyApp extends App<MyAppProps> {
  // TODOTS
  public static async getInitialProps({ Component, ctx }: any) {
    let pageProps: any = {};

    const rootStore = initializeStore();

    await rootStore.websitesStore.getWebsites(true);

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
