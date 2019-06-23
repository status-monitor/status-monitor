import React, { PureComponent, ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import { overlayService } from './service';
import { OverlayContainerDiv } from './styles';

interface DialogProps {
  isOpen: boolean;
  onClose?: (...args: any[]) => void;
  dismissable?: boolean;
  // todots
  children: any;
}

export const useDialog = (initialValue: boolean = false): [boolean, () => void, (...args: any[]) => void] => {
  const [value, setValue] = useState(initialValue);

  return [value, () => setValue(true), () => setValue(false)];
};

interface DialogState {
  appLoaded: boolean;
}

export class Dialog extends PureComponent<DialogProps, DialogState> {
  public static defaultProps = {
    dismissable: true,
  };

  public state: DialogState = {
    appLoaded: false,
  };

  public isClickingInsideDialog: boolean = false;

  public componentDidMount() {
    document.addEventListener('keydown', this.keyDown);

    this.setState({
      appLoaded: true,
    });
  }
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  public keyDown = (evt: KeyboardEvent) => {
    const { dismissable } = this.props;
    if (evt.key === 'Escape' && dismissable) {
      this.close();
    }
  };

  public onClickInsideDialogStart = () => {
    this.isClickingInsideDialog = true;
  };

  public onClickEnd = () => {
    this.isClickingInsideDialog = false;
  };

  public backdropClick = () => {
    const { dismissable } = this.props;
    if (!dismissable || this.isClickingInsideDialog) {
      return;
    }
    this.close();
  };

  public close = () => {
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  public getChildren() {
    return React.Children.map(this.props.children, (child: ReactElement<any>) => {
      return React.cloneElement(
        child,
        (child.type as any).componentName === 'DialogHeader'
          ? {
              onClose: this.close,
              dismissable: this.props.dismissable,
            }
          : (child.type as any).componentName === 'DialogBody'
          ? {
              hasHeader: this.hasHeader(),
              hasFooter: this.hasFooter(),
            }
          : null,
      );
    });
  }

  public stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  public hasHeader = () => {
    return (
      React.Children.toArray(this.props.children).findIndex(
        child => (child as any).type.componentName === 'DialogHeader',
      ) > -1
    );
  };

  public hasFooter = () => {
    return (
      React.Children.toArray(this.props.children).findIndex(
        child => (child as any).type.componentName === 'DialogFooter',
      ) > -1
    );
  };

  public render() {
    const { isOpen } = this.props;
    const { appLoaded } = this.state;

    if (!isOpen || !overlayService.globalDiv || !appLoaded) {
      return null;
    }

    const renderElem = (
      <OverlayContainerDiv onMouseUp={this.onClickEnd}>
        <div className="backdrop" />
        <div className="overlay-wrapper" onMouseUp={this.backdropClick}>
          <div className="overlay" onClick={this.stopPropagation} onMouseDown={this.onClickInsideDialogStart}>
            {this.getChildren()}
          </div>
        </div>
      </OverlayContainerDiv>
    );

    return ReactDOM.createPortal(renderElem, overlayService.globalDiv);
  }
}
