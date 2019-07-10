import { useRootStore } from './root-store';

export const useWebsitesStore = () => {
  const rootStore = useRootStore();
  return rootStore.websitesStore;
};
export const useConfirmStore = () => {
  const rootStore = useRootStore();
  return rootStore.confirmStore;
};
