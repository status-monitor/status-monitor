import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { Dialog, DialogFooter, DialogHeader, DialogBody } from '@app/shared/dialog';
import { Button } from '@app/shared/button';
import { Input } from '@app/shared/form/input';
import { Flex } from '@app/shared/flex';
import { Select } from '@app/shared/form/select';
import { useFormValue } from '@app/shared/form/hooks';
import { Scenario } from '@common/models/scenario';
import { useScenariosStore } from '@app/stores';
import { observer } from 'mobx-react-lite';
import { SelectMultiple } from '@app/shared/form/select-multiple';
import { getUniqueStringFromZone } from '@common/utils/zone';

interface WebsiteDialogProps {
  scenario?: Scenario;
  open: boolean;
  onClose: (values?: Scenario) => void;
}

const options = [
  { label: 'Every 5 seconds', value: '5' },
  { label: 'Every 10 seconds', value: 10 },
  { label: 'Every 30 seconds', value: 30 },
  { label: 'Every 1 minute', value: 60 },
  { label: 'Every 2 minutes', value: 120 },
  { label: 'Every 5 minutes', value: 300 },
  { label: 'Every 15 minutes', value: 900 },
  { label: 'Every 30 minutes', value: 1800 },
  { label: 'Every 1 hour', value: 3600 },
  { label: 'Every 6 hours', value: 21600 },
  { label: 'Every day', value: 86400 },
];

export const ScenarioDialog: React.FC<WebsiteDialogProps> = observer(
  ({ open, onClose, scenario }): ReactElement => {
    const scenariosStore = useScenariosStore();
    const [name, bindName, setName] = useFormValue<string>(scenario ? scenario.name : '');
    const [interval, bindInterval, setIntervalValue] = useFormValue<Scenario['interval']>(
      scenario ? scenario.interval : null,
    );
    const [zones, bindZones, setZones] = useFormValue<Scenario['zones']>(scenario ? scenario.zones : []);

    const closeDialog = useCallback(() => onClose({ name, interval, zones }), [interval, name, onClose, zones]);

    const zonesOptions = useMemo(
      () =>
        scenariosStore.zones
          ? scenariosStore.zones.map(zone => ({
              label: zone.type === 'self' ? 'Self' : `AWS - ${zone.id}`,
              value: zone,
            }))
          : [],
      [scenariosStore.zones],
    );

    useEffect(() => {
      setName(scenario ? scenario.name : '');
      setIntervalValue(scenario ? scenario.interval : null);
      setZones(scenario ? scenario.zones : []);
    }, [scenario, setIntervalValue, setName, setZones]);

    return (
      <Dialog isOpen={open} onClose={onClose}>
        <DialogHeader>Add a scenario</DialogHeader>
        <DialogBody withPadding={true}>
          <Input label="Name" {...bindName} />
          <Select options={options} label="Interval" toInteger {...bindInterval} />
          <SelectMultiple
            options={zonesOptions}
            label="Zones"
            toUniqueString={getUniqueStringFromZone}
            {...bindZones}
          />
        </DialogBody>
        <DialogFooter>
          <Flex />
          <Button onClick={closeDialog}>{scenario ? 'Edit' : 'Add'}</Button>
        </DialogFooter>
      </Dialog>
    );
  },
);
