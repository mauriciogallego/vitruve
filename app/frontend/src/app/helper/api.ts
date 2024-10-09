import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Headers, Options } from '../../@types';

const URL = process.env.REACT_APP_API_URL;
const headers: Headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

console.log({ URL });
export const instance = axios.create({
  baseURL: `${URL}/v1`.trim(),
  timeout: 30000,
});

const interceptorRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const session: string | null = localStorage.getItem('access_token');

  if (session && config.headers) {
    config.headers.Authorization = `Bearer ${session}`;
  }

  return config;
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('firebase_access_token');
};

const interceptorResponse = async (config: { response: AxiosResponse }) => {
  if (
    config.response.status === 401 &&
    config.response.data.message === 'AUTHORIZATION_REQUIRED'
  ) {
    removeToken();

    return Promise.resolve(true);
  }
  return Promise.reject(config);
};

instance.interceptors.request.use(interceptorRequest);
instance.interceptors.response.use((config) => config, interceptorResponse);

async function createRequest(url: string, options: Options) {
  const response = await instance.request({
    url,
    data: options.data,
    method: options.method,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
  return response;
}

export const setToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const get = async (url: string, options?: Options) => {
  const request = await createRequest(url, {
    ...options,
    method: 'GET',
  });
  return request;
};

export const post = async (url: string, options: Options) => {
  const request = await createRequest(url, {
    ...options,
    method: 'POST',
    data: options.data,
  });
  return request;
};

export const patch = async (url: string, options: Options) => {
  const request = await createRequest(url, {
    ...options,
    method: 'PATCH',
    data: options.data,
  });
  return request;
};

export const del = async (url: string, options: Options) => {
  const request = await createRequest(url, {
    ...options,
    method: 'DELETE',
    data: options.data,
  });
  return request;
};
