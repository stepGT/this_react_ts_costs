import { IAlert } from '../types/index';
import { setAlert } from '../context/alert';

export const handleAlertMessage = (alert: IAlert) => {
  setAlert(alert);
  setTimeout(() => setAlert({ alertText: '', alertStatus: '' }), 3000);
};
