import axios from 'axios';
const ipPub = '45.251.74.165';
const ipLoc = '172.31.101.127';

export default axios.create({
  baseURL: `http://${ipPub}:3001/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
