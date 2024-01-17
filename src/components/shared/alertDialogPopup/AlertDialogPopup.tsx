import { useTransition } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import IAlertDialogPopup from './IAlertDialogPopup';
import { spinnerIcon } from '@/assets/icons';

const AlertDialogPopup: React.FC<IAlertDialogPopup> = ({
  toggler,
  title,
  handleClick,
  action,
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>{toggler}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            This change is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(() => {
                handleClick();
              });
            }}
          >
            {isPending ? (
              <>
                <img
                  src={spinnerIcon}
                  alt='actioning'
                  width={20}
                  height={20}
                  className='stroke-white'
                />
              </>
            ) : (
              action
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogPopup;
