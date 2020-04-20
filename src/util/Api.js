import axios from 'axios';

export default axios.create({
  baseURL: `http://${window.location.hostname}:3001/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
