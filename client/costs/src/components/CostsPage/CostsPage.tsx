﻿import { Header } from './Header/Header';

export const CostsPage = () => {
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Учет моих расходов</h2>
      <Header costs={[]} />
    </div>
  );
};
