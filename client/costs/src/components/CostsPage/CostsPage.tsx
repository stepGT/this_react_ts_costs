import { useEffect, useMemo, useRef, useState } from 'react';
import { useUnit } from 'effector-react';
import { Header } from './Header/Header';
import { Spinner } from '../Spinner/Spinner';
import { getAuthDataFromLS } from '../../utils/auth';
import { getCostsFx } from '../../API/costsClient';
import { $costs, setCosts } from '../../context/index';
import { CostsList } from './CostsList/CostsList';

export const CostsPage = () => {
  const [spinner, setSpinner] = useState(false);
  const shouldLoadCosts = useRef(true);
  const store = useUnit($costs);

  useEffect(() => {
    if (shouldLoadCosts.current) {
      shouldLoadCosts.current = false;
      handleGetCosts();
    }
  }, []);

  const handleGetCosts = async () => {
    setSpinner(true);
    const authData = getAuthDataFromLS();

    const costs = await getCostsFx({
      url: '/cost',
      token: authData.access_token,
    });
    //
    setSpinner(false);
    setCosts(costs);
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Учет моих расходов</h2>
      {useMemo(
        () => (
          <Header costs={store} />
        ),
        [store],
      )}
      <div style={{ position: 'relative' }}>
        {spinner && <Spinner top={0} left={0} />}
        {useMemo(
          () => (
            <CostsList costs={store} />
          ),
          [store],
        )}
        {!spinner && !store.length && <h2>Список расходов пуст</h2>}
      </div>
    </div>
  );
};
