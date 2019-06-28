import React, { ReactElement, useEffect, useCallback } from 'react';
import { StatelessPage } from '@app/models/page';
import { Container } from '@app/shared/container';
import { observer } from 'mobx-react-lite';
import { Card } from '@app/shared/card';
import { Input } from '@app/shared/form/input';
import { putSettingsApi, getSettingsApi, putAwsSettingsApi } from '@app/api';
import { Button } from '@app/shared/button';
import { useFormValue } from '@app/shared/form/hooks';
import { useDialog } from '@app/shared/dialog';
import { AwsDialog } from '@app/components/dialogs/aws-dialog';

const SettingsPage: StatelessPage = observer(
  (): ReactElement => {
    const [slackWebhook, bindSlackWebhook, setSlackWebhook] = useFormValue<string>('');
    const [slackChannel, bindSlackChannel, setSlackChannel] = useFormValue<string>('');
    const [awsDialogOpen, openAwsDialog, onCloseAwsDialog] = useDialog();

    useEffect(() => {
      getSettingsApi().then(({ settings }) => {
        if (!settings || !settings.slack) {
          return;
        }
        setSlackChannel(settings.slack.channel);
        setSlackWebhook(settings.slack.webhookUrl);
      });
    }, [setSlackChannel, setSlackWebhook]);

    const onChangeAwsSettings = useCallback(
      values => {
        onCloseAwsDialog();
        if (values) {
          putAwsSettingsApi(values);
        }
      },
      [onCloseAwsDialog],
    );

    return (
      <Container>
        <Card>
          <Container>
            <h1>Aws</h1>
            <Button onClick={openAwsDialog}>Edit</Button>
            <AwsDialog open={awsDialogOpen} onClose={onChangeAwsSettings} />
          </Container>
        </Card>
        <Card>
          <Container>
            <h1>
              Slack integration{' '}
              <small>
                <a href="https://api.slack.com/incoming-webhooks" target="_blank" rel="noopener noreferrer">
                  https://api.slack.com/incoming-webhooks
                </a>
              </small>
            </h1>

            <br />
            <Input label="Webhook url" {...bindSlackWebhook} />
            <br />
            <Input label="Slack channel" {...bindSlackChannel} />
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
