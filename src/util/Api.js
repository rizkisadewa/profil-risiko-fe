import axios from 'axios';
const ipPub = '45.251.74.165';
const ipLoc = '172.31.101.127'
const ipProd = '172.31.203.71';
const ipLoc = '172.31.203.71';

export const backendUrl = `http://${ipProd}:9015/`;

export default axios.create({
  baseURL: `http://${ipProd}:9015/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
