// eslint-disable-next-line @typescript-eslint/no-unused-vars
const icons = [
  'analytics',
  'approved',
  'check',
  'clock',
  'close',
  'delete',
  'diagonal-arrow',
  'dropdown-arrow',
  'Google',
  'hourglass',
  'log-in',
  'logout',
  'reject',
  'search',
  'smile',
  'user',
  'video',
] as const;

export type IconName = typeof icons[number];
