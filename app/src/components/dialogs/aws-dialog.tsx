import React, { ReactElement } from 'react';
import { Dialog, DialogFooter, DialogHeader, DialogBody } from '@app/shared/dialog';
import { Button } from '@app/shared/button';
import { Input } from '@app/shared/form/input';
import { Flex } from '@app/shared/flex';
import { useFormValue } from '@app/shared/form/hooks';
import { Settings } from '@common/models/settings';

interface WebsiteDialogProps {
  open: boolean;
  onClose: (values?: Settings['aws']) => void;
}

export const AwsDialog: React.FC<WebsiteDialogProps> = ({ open, onClose }): ReactElement => {
  const [accessKey, bindAccessKey, setAccessKey] = useFormValue<string>('');
  const [secretKey, bindSecretKey, setSecretKey] = useFormValue<string>('');

  const close = (values?: Settings['aws']) => {
    onClose(values);
    setAccessKey('');
    setSecretKey('');
  };

  return (
    <Dialog isOpen={open} onClose={close}>
      <DialogHeader>Set AWS credentials</DialogHeader>
      <DialogBody withPadding={true}>
        <Input label="Access Key" {...bindAccessKey} />
        <Input label="Secret Key" {...bindSecretKey} />
      </DialogBody>
      <DialogFooter>
        <Flex />
        <Button onClick={() => close({ accessKey, secretKey })}>Save</Button>
      </DialogFooter>
    </Dialog>
  );
};
