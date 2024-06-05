import { setAuth } from '../context/auth';
import API from './axiosClient';

export class AuthClient {
  static async login(username: string, password: string) {
    try {
      const result = await API.post('/auth/login', { username, password });

      if (result.status === 200) {
        setAuth(true);
        localStorage.setItem('auth', JSON.stringify(result.data));
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  }
}
