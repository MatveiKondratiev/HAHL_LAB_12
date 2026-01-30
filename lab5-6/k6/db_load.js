import http from 'k6/http';
import { check } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:8000';
const vus = Number(__ENV.VUS || 50);
const duration = __ENV.DURATION || '1m';
const maxId = Number(__ENV.MAX_ID || 10000);

export const options = {
  vus,
  duration,
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const id = Math.floor(Math.random() * maxId) + 1;
  const res = http.get(`${baseUrl}/items/db/${id}`);
  check(res, { 'status 200': (r) => r.status === 200 });
}
