import { createEffect } from 'effector';
import API from './axiosClient';
import { IBaseEffectArgs, ICreateCost, IDeleteCost, IRefreshToken, IUpdateCost } from '../types';
import { removeUser } from '../utils/auth';
import { handleAxiosError } from '../utils/errors';

export const createCostFx = createEffect(async ({ url, cost, token }: ICreateCost) => {
  try {
    const { data } = await API.post(
      url,
      { ...cost },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return data;
  } catch (error) {
    handleAxiosError(error, { type: 'create', createCost: { cost } });
  }
});

export const getCostsFx = createEffect(async ({ url, token }: IBaseEffectArgs) => {
  try {
    const { data } = await API.get(url, { headers: { Authorization: `Bearer ${token}` } });

    return data;
  } catch (error) {
    handleAxiosError(error, { type: 'get' });
  }
});

export const refreshTokenFx = createEffect(async ({ url, token, username }: IRefreshToken) => {
  try {
    const result = await API.post(url, { refresh_token: token, username });

    if (result.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...result.data,
          username,
        }),
      );
      return result.data.access_token;
    } else {
      removeUser();
    }
  } catch (error) {}
});

export const deleteCostFx = createEffect(async ({ url, token, id }: IDeleteCost) => {
  try {
      await API.delete(`${url}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
  } catch (error) {
      handleAxiosError(error, { type: 'delete', deleteCost: { id } });
  }
});

export const updateCostFx = createEffect(async ({ url, cost, token, id }: IUpdateCost) => {
  try {
    const { data } = await API.patch(
      `${url}/${id}`,
      { ...cost },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return data;
  } catch (error) {
    handleAxiosError(error, { type: 'update', updateCost: { cost, id } });
  }
});
