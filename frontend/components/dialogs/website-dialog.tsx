import React, { ReactElement, memo, useCallback, useMemo } from 'react';
import { Dialog, DialogFooter, DialogHeader, DialogBody } from '@app/shared/dialog';
import { Button } from '@app/shared/button';
import { Input } from '@app/shared/form/input';
import { Checkbox } from '@app/shared/form/checkbox';
import { Flex } from '@app/shared/flex';
import { Website, httpMethods } from '@common/models/website';
import { Select } from '@app/shared/form/select';
import { useFormValue } from '@app/shared/form/hooks';
import { useScenariosStore } from '@app/stores';
import { JsonTextarea } from '@app/shared/form/json-textarea';

interface WebsiteDialogProps {
  website?: Website;
  open: boolean;
  onClose: (values?: Website) => void;
}

export const WebsiteDialog: React.FC<WebsiteDialogProps> = memo(
  ({ open, onClose, website }): ReactElement => {
    const scenariosStore = useScenariosStore();

    const [name, bindName] = useFormValue<string>(website ? website.name : '');
    const [path, bindPath] = useFormValue<string>(website ? website.path : '/');
    const [protocol, bindProtocol] = useFormValue<Website['protocol']>(website ? website.protocol : 'http');
    const [host, bindHost] = useFormValue<string>(website ? website.host : '');
    const [scenarioId, bindScenarioId] = useFormValue<string>(website ? website.scenarioId : '');
    const [method, bindMethod] = useFormValue<Website['httpParameters']['method']>(
      website ? website.httpParameters && website.httpParameters.method : 'GET',
    );
    const [data, bindData] = useFormValue<Website['httpParameters']['data']>(
      website ? website.httpParameters && website.httpParameters.data : '',
    );
    const [notificationsDisabled, bindNotificationsDisabled] = useFormValue<Website['notificationsDisabled']>(
      website ? website.notificationsDisabled : false,
    );

    const closeDialog = useCallback(
      () =>
        onClose({ name, path, protocol, host, scenarioId, notificationsDisabled, httpParameters: { method, data } }),
      [data, host, method, name, notificationsDisabled, onClose, path, protocol, scenarioId],
    );

    const scenarios = useMemo(
      () => scenariosStore.scenarios.map(scenario => ({ label: scenario.name, value: scenario._id })),
      [scenariosStore.scenarios],
    );
    const httpOptions = useMemo(() => httpMethods.map(v => ({ label: v, value: v })), []);

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
          <Select options={scenarios} label="Scenario" {...bindScenarioId} />
          <Select options={httpOptions} label="Http Method" {...bindMethod} />
          {method !== 'GET' && <JsonTextarea label="Http JSON parameters" {...bindData} />}
          <Checkbox label="Notifications disabled" {...bindNotificationsDisabled} />
        </DialogBody>
        <DialogFooter>
          <Flex />
          <Button onClick={closeDialog}>{website ? 'Edit' : 'Add'}</Button>
        </DialogFooter>
      </Dialog>
    );
  },
);
