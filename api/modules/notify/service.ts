import { findOneSettings } from '../settings/dao';
import { Settings } from '@common/models/settings';
import { Website } from '@common/models/website';
import { sendSlackMessage } from './slack';

export const notifySlack = async (settings: Settings, isAlive: boolean, website: Website): Promise<void> => {
  if (isAlive) {
    sendSlackMessage(settings.slack.webhookUrl, settings.slack.channel, `\`${website.name}\` is back online.`);
  } else {
    sendSlackMessage(settings.slack.webhookUrl, settings.slack.channel, `\`${website.name}\` is offline !`);
  }
};

export const notifyStatusChange = async (isAlive: boolean, website: Website): Promise<void> => {
  const settings = await findOneSettings();

  if (settings.slack.webhookUrl) {
    notifySlack(settings, isAlive, website);
  }
};
