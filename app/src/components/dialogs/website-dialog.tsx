import React, { ReactElement } from 'react';
import { Dialog, DialogFooter, DialogHeader, DialogBody } from '@app/shared/dialog';
import { Button } from '@app/shared/button';
import { useInput, Input } from '@app/shared/form/input';
import { Flex } from '@app/shared/flex';
import { Website } from '@common/models/website';

interface WebsiteDialogProps {
  open: boolean;
  onClose: (values?: Website) => void;
}

export const WebsiteDialog: React.FC<WebsiteDialogProps> = ({ open, onClose }): ReactElement => {
  const [name, bindName] = useInput();
  const [path, bindPath] = useInput('/');
  const [protocol, bindProtocol] = useInput('http');
  const [host, bindHost] = useInput();

  return (
    <Dialog isOpen={open} onClose={onClose}>
      <DialogHeader>Add a website</DialogHeader>
      <DialogBody withPadding={true}>
        <Input label="Name" {...bindName} />
        <Input label="Host" {...bindHost} />
        <Input label="Protocol" {...bindProtocol} />
        <Input label="Path" {...bindPath} />
      </DialogBody>
      <DialogFooter>
        <Flex />
        <Button onClick={() => onClose({ name, path, protocol, host })}>Add</Button>
      </DialogFooter>
    </Dialog>
  );
};
