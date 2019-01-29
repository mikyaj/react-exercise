import axios from 'axios';
import { GitEndPoints, UserEndPoints } from '../constants';

const getRepositoriesByLanguage = (languageName) => {
  const params = {
    q: `language:${languageName}`,
    order: 'desc',
    per_page: 10
  };
  return axios.get(GitEndPoints.SearchRepo, { params });
}

const createUser = (data) => {
  return axios.post(UserEndPoints.Create, { data: data })
}

export { getRepositoriesByLanguage, createUser };