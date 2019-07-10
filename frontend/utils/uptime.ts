import moment from 'moment';

export const getFormattedUptime = (dateString: string | Date) => {
  const date = moment(dateString);
  const today = moment();

  const secondsDiff = today.diff(date, 'seconds');

  if (secondsDiff < 60) {
    return `${secondsDiff} seconds`;
  }
  if (secondsDiff < 3600) {
    return `${today.diff(date, 'minutes')} minutes`;
  }
  if (secondsDiff < 24 * 3600) {
    return `${today.diff(date, 'hours')} hours`;
  }

  return `${today.diff(date, 'days')} days`;
};
