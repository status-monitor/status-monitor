import React, { ReactElement } from 'react';
import { Dialog, DialogFooter, DialogHeader, DialogBody } from '@app/shared/dialog';
import { Button } from '@app/shared/button';
import { Input } from '@app/shared/form/input';
import { Flex } from '@app/shared/flex';
import { Website } from '@common/models/website';
import { Select } from '@app/shared/form/select';
import { useFormValue } from '@app/shared/form/hooks';

interface WebsiteDialogProps {
  website?: Website;
  open: boolean;
  onClose: (values?: Website) => void;
}

export const WebsiteDialog: React.FC<WebsiteDialogProps> = ({ open, onClose, website }): ReactElement => {
  const [name, bindName] = useFormValue<string>(website ? website.name : '');
  const [path, bindPath] = useFormValue<string>(website ? website.path : '/');
  const [protocol, bindProtocol] = useFormValue<Website['protocol']>(website ? website.protocol : 'http');
  const [host, bindHost] = useFormValue<string>(website ? website.host : '');

  return (
    <Dialog isOpen={open} onClose={onClose}>
      <DialogHeader>Add a website</DialogHeader>
      <DialogBody withPadding={true}>
        <Input label="Name" {...bindName} />
        <Select
          options={[{ label: 'http://', value: 'http' }, { label: 'https://', value: 'https' }]}
          label="Protocol"
          {...bindProtocol}
        />
        <Input label="Host" {...bindHost} />
        <Input label="Path" {...bindPath} />
      </DialogBody>
      <DialogFooter>
        <Flex />
        <Button onClick={() => onClose({ name, path, protocol, host })}>{website ? 'Edit' : 'Add'}</Button>
      </DialogFooter>
    </Dialog>
  );
};
