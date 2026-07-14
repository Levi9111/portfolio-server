import config from '../config';
import logger from './logger';

interface INotificationPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const sendNotification = async (
  payload: INotificationPayload,
): Promise<void> => {
  const { name, email, subject, message } = payload;
  const msgSubject = subject || 'No Subject';

  console.log(`[sendNotification] Initiating Discord notification. Sender: "${name}" <${email}>, Subject: "${msgSubject}"`);
  console.log(`[sendNotification] Configured Webhook URL length: ${config.discord_webhook_url ? config.discord_webhook_url.length : 0}`);

  if (config.discord_webhook_url) {
    try {
      logger.info(`Sending notification to Discord webhook: ${config.discord_webhook_url.substring(0, 30)}...`);
      const bodyPayload = {
        embeds: [
          {
            title: `📩 New Message: ${msgSubject}`,
            color: 9133302, // Hex #8B5CF6 -> Decimal 9133302
            fields: [
              { name: 'Sender Name', value: name, inline: true },
              { name: 'Sender Email', value: email, inline: true },
              { name: 'Subject', value: msgSubject, inline: false },
              { name: 'Message', value: message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };
      
      const response = await fetch(config.discord_webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload),
      });

      console.log(`[sendNotification] Discord response status: ${response.status} (${response.statusText})`);

      if (!response.ok) {
        const errText = await response.text().catch(() => 'No response body');
        logger.error(`Discord webhook returned non-ok status ${response.status}. Response: ${errText}`);
      } else {
        logger.info('Discord notification sent successfully.');
      }
    } catch (error) {
      logger.error('Failed to send Discord notification due to fetch error:', error);
    }
  } else {
    logger.warn('Discord notification skipped: DISCORD_WEBHOOK_URL is not configured on this server.');
  }
};
