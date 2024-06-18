import { createDomain } from 'effector';
import { ICost } from '../types';

const handleRemoveCost = (costs: ICost[], id: string | number) =>
  costs.filter((cost) => cost._id !== id);

const costs = createDomain();

export const setCosts = costs.createEvent<ICost[]>();
export const createCost = costs.createEvent<ICost>();
export const updatedCost = costs.createEvent<ICost>();
export const removeCost = costs.createEvent<string | number>();

export const setTotalPrice = costs.createEvent<number>();
export const $totalPrice = costs.createStore<number>(0).on(setTotalPrice, (_, value) => value);
export const $costs = costs
  .createStore<ICost[]>([])
  .on(createCost, (state, cost) => [...state, cost])
  .on(setCosts, (_, costs) => costs)
  .on(removeCost, (state, id) => [...handleRemoveCost(state, id)]);
