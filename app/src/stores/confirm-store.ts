import { observable } from 'mobx';
import { RootStore } from './root-store';

export class ConfirmStore {
  public rootStore: RootStore;

  @observable
  public isOpen: boolean;

  @observable
  public text: string;

  private callback: () => void;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  public confirm = (text: string, callback: () => void) => {
    this.isOpen = true;
    this.text = text;
    this.callback = callback;
    console.log(this.isOpen, text, callback);
  };

  public onCancel = () => {
    this.isOpen = false;
  };

  public onConfirm = () => {
    this.isOpen = false;
    this.callback();
  };
}
