import type { PrismTheme } from 'prism-react-renderer';
import github from './themes/github';
import dracula from './themes/dracula';

export const getCodeTheme = (theme: string): PrismTheme => {
  switch (theme) {
    case 'dracula':
      return dracula;
    case 'github':
    default:
      return github;
  }
};
