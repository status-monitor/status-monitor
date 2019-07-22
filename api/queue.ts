// import { checkWebsite } from './modules/healthcheck/services';
// import { notifySlack } from './modules/notify/service';
import { loadWebsiteIntervalWatcher } from './queue/website-interval';
import { loadScenariosFixtures } from './modules/scenarios/fixtures';
import { upsertLambdaFunctions } from './modules/aws/services';

// setInterval(() => {
//   websites.forEach(website => checkWebsite(website));
//   notifySlack();
// }, 10000);
loadWebsiteIntervalWatcher();
loadScenariosFixtures();
upsertLambdaFunctions();
