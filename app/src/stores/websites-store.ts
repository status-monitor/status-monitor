import { observable } from 'mobx';
import { getWebsitesApi, postWebsiteApi, deleteWebsiteApi } from '../api';
import { RootStore } from './root-store';
import { Website } from '@common/models/website';

export class WebsitesStore {
  public rootStore: RootStore;

  @observable
  public websites: Website[];

  public constructor(rootStore: RootStore, data: any) {
    this.rootStore = rootStore;

    this.websites = data && data.websites;

    if (process.browser) {
      setInterval(() => {
        this.getWebsites();
      }, 10000);
    }
  }

  public toJson() {
    return {
      websites: this.websites,
    };
  }

  public addWebsite = async (website: Website) => {
    const result = await postWebsiteApi({
      host: website.host,
      name: website.name,
      path: website.path,
      protocol: website.protocol,
    });
    this.websites = [...this.websites, result.website];
  };

  public removeWebsite = async (websiteId: string) => {
    this.websites.splice(this.websites.findIndex(w => w._id === websiteId), 1);
    await deleteWebsiteApi(websiteId);
  };

  public async getWebsites(dontOverride?: boolean) {
    if (this.websites && dontOverride) {
      return;
    }
    const { websites } = await getWebsitesApi();
    this.websites = websites;
  }
}
