import React, { ReactElement, useEffect, useCallback, useState } from 'react';
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
import { Settings } from '@common/models/settings';

const SettingsPage: StatelessPage<{ settings: Settings }> = observer(
  ({ settings }): ReactElement => {
    const [slackWebhook, bindSlackWebhook] = useFormValue<string>(
      settings && settings.slack && settings.slack.webhookUrl,
    );
    const [slackChannel, bindSlackChannel] = useFormValue<string>(settings && settings.slack && settings.slack.channel);
    const [isAwsSetup, setIsAwsSetup] = useState<boolean>(settings && settings.aws && !!settings.aws.accessKey);
    const [awsDialogOpen, openAwsDialog, onCloseAwsDialog] = useDialog();

    const onChangeAwsSettings = useCallback(
      values => {
        onCloseAwsDialog();
        if (values) {
          putAwsSettingsApi(values);
          setIsAwsSetup(true);
        }
      },
      [onCloseAwsDialog],
    );

    return (
      <Container>
        <Card>
          <Container>
            <h1>Aws</h1>
            <Button onClick={openAwsDialog}>{isAwsSetup ? 'Edit' : 'Set up'}</Button>
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

SettingsPage.getInitialProps = async () => {
  const { settings } = await getSettingsApi();
  return { settings };
};

SettingsPage.title = 'Settings';

export default SettingsPage;
