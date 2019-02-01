import axios from 'axios';
import { GitEndPoints, UserEndPoints } from '../constants';

const getRepositoriesByLanguage = (languageName) => {
  const params = {
    q: `language:${languageName}`,
    order: 'desc',
    per_page: 10,
    sort: 'stars'
  };
  return axios.get(GitEndPoints.SearchRepo, { params });
}

const registerUser = (data) => {
  return axios.post(UserEndPoints.Create, { data: data })
}

const reduceDataForChart = (items) => {
  return items.map((item) => {
    return { repoName: item.name, stars: item.stargazers_count }
  })
}

export { getRepositoriesByLanguage, registerUser, reduceDataForChart };