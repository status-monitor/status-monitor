import React, { ReactElement } from 'react';
import { Dialog, DialogFooter, DialogHeader, DialogBody } from '@app/shared/dialog';
import { Button } from '@app/shared/button';
import { Flex } from '@app/shared/flex';
import { useConfirmStore } from '@app/stores';
import { observer } from 'mobx-react-lite';

export const ConfirmDialog: React.FC = observer(
  (): ReactElement => {
    const confirmStore = useConfirmStore();

    return (
      <Dialog isOpen={confirmStore.isOpen} onClose={confirmStore.onCancel}>
        <DialogHeader>Confirm</DialogHeader>
        <DialogBody withPadding={true}>{confirmStore.text}</DialogBody>
        <DialogFooter>
          <Flex />
          <Button onClick={confirmStore.onCancel} theme="light">
            Cancel
          </Button>
          <Button onClick={confirmStore.onConfirm}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    );
  },
);
