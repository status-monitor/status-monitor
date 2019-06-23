// @ts-ignore
import Slack from 'slack-notify';

export const sendSlackMessage = async (webhookUrl: string, channel: string, text: string, fields?: any) => {
  const slackNotify = Slack(webhookUrl);

  slackNotify.send({
    channel: channel,
    username: 'Status Monitor',
    // eslint-disable-next-line @typescript-eslint/camelcase
    icon_url: 'https://d1skiljv959k44.cloudfront.net/static/statusmonitor-square.png',
    text,
    fields,
  });
};
