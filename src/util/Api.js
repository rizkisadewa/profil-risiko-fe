import axios from 'axios';

export default axios.create({
  baseURL: `http://45.251.74.165:3001/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
