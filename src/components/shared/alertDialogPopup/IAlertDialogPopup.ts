import { IconNode } from 'lucide-react';
import { ReactElement } from 'react';

export default interface IAlertDialogPopup {
  toggler: string | ReactElement<IconNode>;
  title: string;
  action: string;
  handleClick: () => void;
}
