import { createEffect } from 'effector';
import API from './axiosClient';
import { IBaseEffectArgs, ICreateCost } from '../types';

export const createCostFx = createEffect(async ({ url, cost, token }: ICreateCost) => {
  try {
    const { data } = await API.post(
      url,
      { ...cost },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getCostsFx = createEffect(async ({ url, token }: IBaseEffectArgs) => {
  try {
    const { data } = await API.get(url, { headers: { Authorization: `Bearer ${token}` } });

    return data;
  } catch (error) {
    console.log(error);
  }
});
