import { NextContext } from 'next';
import { RootStore } from '@app/stores/root-store';

export interface StatelessPage<P = {}> extends React.FC<P> {
  title?: string;
  getInitialProps?: (ctx: NextContext, rootStore: RootStore) => Promise<P>;
}
