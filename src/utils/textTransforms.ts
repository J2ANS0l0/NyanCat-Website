export const toUpperCase = (text: string): string => {
  return text.toUpperCase();
};

export const toNyan = (text: string): string => {
  return text.split(' ').map(() => 'NYAN').join(' ');
};

export const transformText = (text: string, uppercase: boolean = false, nyanMode: boolean = false): string => {
  if (nyanMode) {
    return toNyan(text);
  }
  if (uppercase) {
    return toUpperCase(text);
  }
  return text;
};
