// import { checkWebsite } from './modules/healthcheck/services';
// import { notifySlack } from './modules/notify/service';
import { loadWebsiteIntervalWatcher } from './queue/website-interval';

// setInterval(() => {
//   websites.forEach(website => checkWebsite(website));
//   notifySlack();
// }, 10000);
loadWebsiteIntervalWatcher();
