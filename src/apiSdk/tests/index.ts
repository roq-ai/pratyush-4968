import axios from 'axios';
import queryString from 'query-string';
import { TestInterface, TestGetQueryInterface } from 'interfaces/test';
import { GetQueryInterface } from '../../interfaces';

export const getTests = async (query?: TestGetQueryInterface) => {
  const response = await axios.get(`/api/tests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTest = async (test: TestInterface) => {
  const response = await axios.post('/api/tests', test);
  return response.data;
};

export const updateTestById = async (id: string, test: TestInterface) => {
  const response = await axios.put(`/api/tests/${id}`, test);
  return response.data;
};

export const getTestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTestById = async (id: string) => {
  const response = await axios.delete(`/api/tests/${id}`);
  return response.data;
};
