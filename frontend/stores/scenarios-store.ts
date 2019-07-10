import { observable } from 'mobx';
import { deleteScenarioApi, getScenariosApi, patchScenarioApi, postScenarioApi } from '@app/api/scenario';
import { RootStore } from './root-store';
import { Scenario } from '@common/models/scenario';

export class ScenariosStore {
  public rootStore: RootStore;

  @observable
  public scenarios: Scenario[];

  public constructor(rootStore: RootStore, data: any) {
    this.rootStore = rootStore;

    this.scenarios = data && data.scenarios;
  }

  public toJson() {
    return {
      scenarios: this.scenarios,
    };
  }

  public addScenario = async (scenario: Scenario) => {
    const result = await postScenarioApi(scenario);
    this.scenarios = [...this.scenarios, result.scenario];
  };

  public updateScenario = async (id: string, scenario: Partial<Scenario>) => {
    const scenarioIndex = this.scenarios.findIndex(w => w._id === id);
    this.scenarios[scenarioIndex] = { ...this.scenarios[scenarioIndex], ...scenario };

    await patchScenarioApi(id, scenario);
  };

  public removeScenario = async (scenarioId: string) => {
    this.scenarios.splice(this.scenarios.findIndex(w => w._id === scenarioId), 1);
    await deleteScenarioApi(scenarioId);
  };

  public async getScenarios(dontOverride?: boolean) {
    if (this.scenarios && dontOverride) {
      return;
    }
    const { scenarios } = await getScenariosApi();
    this.scenarios = scenarios;
  }
}
