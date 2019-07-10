import React, { ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { StatelessPage } from '@app/models/page';
import { Button } from '@app/shared/button';
import { Container } from '@app/shared/container';
import { Flex, FlexRow } from '@app/shared/flex';
import { useScenariosStore, useConfirmStore } from '@app/stores';
import { Card } from '@app/shared/card';
import { useDialog } from '@app/shared/dialog';
import { WebsiteDialog } from '@app/components/dialogs/website-dialog';
import { ScenarioDialog } from '@app/components/dialogs/scenario-dialog';
import { observer } from 'mobx-react-lite';
import { Scenario } from '@common/models/scenario';

const StatusLineDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  line-height: 60px;
  padding: 0 1rem;
`;

const StatusNameDiv = styled.div`
  font-size: 1.15rem;
`;

const ScenariosPage: StatelessPage = observer(
  (): ReactElement => {
    const scenariosStore = useScenariosStore();
    const confirmStore = useConfirmStore();
    const [scenarioDialogOpen, openScenarioDialog, onCloseScenarioDialog] = useDialog();
    const [scenario, setScenario] = useState<Scenario>(null);

    const closeScenarioDialog = useCallback(
      values => {
        if (values) {
          if (scenario) {
            scenariosStore.updateScenario(scenario._id, values);
          } else {
            scenariosStore.addScenario(values);
          }
        }
        onCloseScenarioDialog();
      },
      [onCloseScenarioDialog, scenario, scenariosStore],
    );

    const deleteScenario = useCallback(
      (scenario: Scenario) => () => {
        confirmStore.confirm(`Are you sure to delete ${scenario.name} ?`, () =>
          scenariosStore.removeScenario(scenario._id),
        );
      },
      [confirmStore, scenariosStore],
    );

    const editScenarioDialog = useCallback(
      (scenario: Scenario) => () => {
        setScenario(scenario);
        openScenarioDialog();
      },
      [openScenarioDialog],
    );

    const createScenarioDialog = useCallback(() => {
      setScenario(null);
      openScenarioDialog();
    }, [openScenarioDialog]);

    return (
      <Container>
        <ScenarioDialog scenario={scenario} open={scenarioDialogOpen} onClose={closeScenarioDialog} />
        <FlexRow>
          <h1>Scenarios</h1>
          <Flex></Flex>
          <Button onClick={createScenarioDialog} style={{ marginRight: 5 }}>
            Add
          </Button>
        </FlexRow>
        {scenariosStore.scenarios.map(scenario => (
          <Card key={scenario._id}>
            <StatusLineDiv>
              <StatusNameDiv>{scenario.name}</StatusNameDiv>
              <Flex></Flex>
              <div>
                <Button onClick={editScenarioDialog(scenario)}>Edit</Button>{' '}
                <Button onClick={deleteScenario(scenario)}>X</Button>
              </div>
            </StatusLineDiv>
          </Card>
        ))}
      </Container>
    );
  },
);

ScenariosPage.getInitialProps = async (_, rootStore) => {
  if (process.browser) {
    rootStore.scenariosStore.getScenarios();
  }
  return {};
};

ScenariosPage.title = 'Scenarios';

export default ScenariosPage;
