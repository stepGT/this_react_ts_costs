import { useEffect, useRef, useState, MutableRefObject } from 'react';
import { useUnit } from 'effector-react';

import { ICostsHeaderProps } from '../../../types';
import { Spinner } from '../../Spinner/Spinner';
import { countTotalPrice } from '../../../utils/arrayUtils';
import { $totalPrice } from '../../../context';

import './styles.css';

export const Header = ({ costs }: ICostsHeaderProps) => {
  const [spinner, setSpinner] = useState(false);
  const textRef  = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef  = useRef() as MutableRefObject<HTMLInputElement>;
  const totalPrice = useUnit($totalPrice);

  useEffect(() => {
    countTotalPrice(costs);
  }, [costs]);

  return (
    <div className="costs-header">
      <form className="d-flex mb-3" onSubmit={() => {}}>
        <div className="form-item">
          <span className="mb-3">Куда было потрачено:</span>
          <input ref={textRef} type="text" className="form-control" />
        </div>
        <div className="form-item">
          <span className="mb-3">Сколько было потрачено:</span>
          <input ref={priceRef} type="text" className="form-control" />
        </div>
        <div className="form-item">
          <span className="mb-3">Когда было потрачено:</span>
          <input ref={dateRef} type="date" className="form-control" />
        </div>
        <button className="btn btn-primary add-btn">
          {spinner ? <Spinner top={5} left={20} /> : 'Добавить'}
        </button>
      </form>
      <div style={{ textAlign: 'end', marginBottom: 10 }}>
        Итого:
        <span> {isNaN(parseInt(String(totalPrice))) ? 0 : parseInt(String(totalPrice))}</span>
        р.
      </div>
    </div>
  );
};
