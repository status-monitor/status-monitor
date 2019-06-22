import { useRootStore } from './root-store';

export const useWebsitesStore = () => {
  const rootStore = useRootStore();
  return rootStore.websitesStore;
};
