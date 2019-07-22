import { useContext, createContext, Context } from 'react';
import { WebsitesStore } from './websites-store';
import { ConfirmStore } from './confirm-store';
import { ScenariosStore } from './scenarios-store';

export class RootStore {
  public websitesStore: WebsitesStore;
  public scenariosStore: ScenariosStore;
  public confirmStore: ConfirmStore;

  public constructor(data?: any) {
    this.websitesStore = new WebsitesStore(this, data && data.websitesStore);
    this.scenariosStore = new ScenariosStore(this, data && data.scenariosStore);
    this.confirmStore = new ConfirmStore(this);
  }

  public toJson() {
    return {
      websitesStore: this.websitesStore.toJson(),
      scenariosStore: this.scenariosStore.toJson(),
    };
  }
}

export const RootStoreContext: Context<RootStore> = createContext<RootStore | null>(null);

export const useRootStore = (): RootStore => {
  return useContext(RootStoreContext);
};

let store: RootStore;
export const initializeStore = (data?: any) => {
  if (process.browser) {
    if (!store) {
      store = new RootStore(data);
    }
    return store;
  } else {
    return new RootStore(data);
  }
};
