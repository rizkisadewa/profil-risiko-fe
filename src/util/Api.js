import axios from 'axios';

export default axios.create({
  baseURL: `http://172.31.101.127:3001/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
