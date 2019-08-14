import { findOneSettings } from '../settings/dao';
import { Settings } from '@common/models/settings';
import { Website } from '@common/models/website';
import { sendSlackMessage } from './slack';

export const notifySlack = async (
  settings: Settings,
  isAlive: boolean,
  website: Website,
  reason: string,
): Promise<void> => {
  const message = isAlive ? `\`${website.name}\` is back online.` : `\`${website.name}\` is offline !`;

  if (!settings || !settings.slack || !settings.slack.channel || !settings.slack.webhookUrl) {
    console.log(message);
    return;
  }

  const { channel, webhookUrl } = settings.slack;
  sendSlackMessage(webhookUrl, channel, message);

  if (reason) {
    sendSlackMessage(webhookUrl, channel, `Reason: ${reason}.`);
  }
};

export const notifyStatusChange = async (isAlive: boolean, website: Website, reason: string): Promise<void> => {
  const settings = await findOneSettings();

  if (website.notificationsDisabled) {
    return;
  }

  notifySlack(settings, isAlive, website, reason);
};
