import { NextPageContext } from 'next';
import { RootStore } from '@app/stores/root-store';

export interface StatelessPage<P = {}> extends React.FC<P> {
  title?: string;
  getInitialProps?: (ctx: NextPageContext, rootStore: RootStore) => Promise<P>;
}
