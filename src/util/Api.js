import axios from 'axios';
// const ipPub = '45.251.74.165';
const ipLoc = '172.31.101.127';

export const backendUrl = `http://${ipLoc}:3001/`;

export default axios.create({
  baseURL: `http://${ipLoc}:3001/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
