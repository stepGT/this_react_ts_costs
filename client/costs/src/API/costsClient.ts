import { createEffect } from 'effector';
import API from './axiosClient';
import { IBaseEffectArgs, ICreateCost, IRefreshToken } from '../types';
import { removeUser } from '../utils/auth';

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
