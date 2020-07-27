import { getInset } from 'react-native-safe-area-view';

export const trimText = (text = "", limit) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

export const bottomPadding = getInset('bottom', false);
export const topPadding = getInset('bottom', false);