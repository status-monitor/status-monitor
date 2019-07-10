import React, { ReactElement } from 'react';
import { StatelessPage } from '@app/models/page';
import { Button } from '@app/shared/button';
import { Container } from '@app/shared/container';
import { Flex, FlexRow } from '@app/shared/flex';

const ScenariosPage: StatelessPage = (): ReactElement => {
  // const ScenariosStore = useScenariosStore();
  // const confirmStore = useConfirmStore();
  // const [ScenarioDialogOpen, openScenarioDialog, onCloseScenarioDialog] = useDialog();
  // const [data, setData] = useState<HealthCheckStatus[]>();

  // const Scenario = ScenariosStore.Scenarios.find(w => w._id === id);

  // useEffect(() => {
  //   const call = async () => {
  //     const statuses = await getInfluxApi(Scenario._id);
  //     setData(statuses);
  //   };
  //   if (!process.browser || !Scenario) {
  //     return;
  //   }
  //   const interval = setInterval(() => {
  //     call();
  //   }, 10000);
  //   call();

  //   return () => clearInterval(interval);
  // }, [Scenario]);

  // if (!Scenario) {
  //   return null;
  // }

  return (
    <Container>
      <FlexRow>
        <h1>Scenarios</h1>
        <Flex></Flex>
        <Button onClick={() => {}} style={{ marginRight: 5 }}>
          Edit
        </Button>
      </FlexRow>
    </Container>
  );
};

ScenariosPage.title = 'Scenarios';

export default ScenariosPage;
