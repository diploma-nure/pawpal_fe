/* eslint-disable @typescript-eslint/no-explicit-any */
export const safeStringify = (value: any) => {
  return value != null || value != undefined ? String(value) : undefined;
};
