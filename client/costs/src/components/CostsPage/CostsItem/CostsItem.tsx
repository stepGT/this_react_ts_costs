import { ICostsItemProps } from '../../../types';

export const CostsItem = ({ cost, index }: ICostsItemProps) => {
  return (
    <li
      className="cost-item list-group-item d-flex justify-content-between align-items-center"
      id={cost._id as string}>
      <div className="cost-item-left">
        <span>{index} Магазин</span>
        <span>"{cost.text}"</span>
        <span className="cost-date">Дата "{cost.date as string}"</span>
      </div>
      <div className="cost-item-right d-flex align-items-center">
        <span style={{ marginRight: '10px' }}>Сумма {cost.price}</span>
        <button className="btn btn-primary btn-edit">Изменить</button>
        <button className="btn btn-danger btn-delete">
          <span>&times;</span>
        </button>
      </div>
    </li>
  );
};
