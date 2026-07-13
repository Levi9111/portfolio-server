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

  // 2. Discord Webhook (Instant Chat Notification)
  if (config.discord_webhook_url) {
    try {
      logger.info('Sending notification to Discord webhook');
      const response = await fetch(config.discord_webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        }),
      });

      if (!response.ok) {
        logger.error(`Discord webhook returned status ${response.status}`);
      } else {
        logger.info('Discord notification sent successfully.');
      }
    } catch (error) {
      logger.error('Failed to send Discord notification', error);
    }
  } else {
    logger.debug('Discord notification skipped (DISCORD_WEBHOOK_URL not set)');
  }
};
