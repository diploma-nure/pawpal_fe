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
  'logo',
  'logo-no-color',
  'tiktok',
  'x',
  'instagram',
  'quotation-mark',
  'add',
] as const;

export type IconName = (typeof icons)[number];
