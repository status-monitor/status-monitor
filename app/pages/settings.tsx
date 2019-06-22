import React, { ReactElement, useEffect, useState } from 'react';
import { StatelessPage } from '@app/models/page';
import { Container } from '@app/shared/container';
import { observer } from 'mobx-react-lite';
import { Card } from '@app/shared/card';
import { Input, useInput } from '@app/shared/form/input';
import { putSettingsApi, getSettingsApi } from '@app/api';
import { Button } from '@app/shared/button';

const SettingsPage: StatelessPage = observer(
  (): ReactElement => {
    const [slackWebhook, bindSlackWebhook, setSlackWebhook] = useInput();
    const [slackChannel, bindSlackChannel, setSlackChannel] = useInput();

    useEffect(() => {
      getSettingsApi().then(({ settings }) => {
        if (!settings || !settings.slack) {
          return;
        }
        setSlackChannel(settings.slack.channel);
        setSlackWebhook(settings.slack.webhookUrl);
      });
    }, [setSlackChannel, setSlackWebhook]);

    return (
      <Container>
        <Card>
          <Container>
            <h1>
              Slack integration <small>https://api.slack.com/incoming-webhooks</small>
            </h1>
            <Input label="Webhook url" type="text" {...bindSlackWebhook} />
            <br />
            <Input label="Slack channel" type="text" {...bindSlackChannel} />
            <Button
              onClick={() => {
                putSettingsApi({
                  slack: {
                    channel: slackChannel,
                    webhookUrl: slackWebhook,
                  },
                });
              }}
            >
              Save
            </Button>
          </Container>
        </Card>
      </Container>
    );
  },
);

SettingsPage.title = 'Settings';

export default SettingsPage;
