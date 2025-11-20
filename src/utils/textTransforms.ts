export const toUpperCase = (text: string): string => {
  return text.toUpperCase();
};

export const toNyan = (text: string): string => {
  return text.split(' ').map(() => 'NYAN').join(' ');
};

let nyanMode = false;

export const setNyanMode = (enabled: boolean) => {
  nyanMode = enabled;
};

export const getNyanMode = () => nyanMode;

export const transformText = (text: string, uppercase: boolean = false): string => {
  if (nyanMode) {
    return toNyan(text);
  }
  if (uppercase) {
    return toUpperCase(text);
  }
  return text;
};
