import http from 'k6/http';
import { check } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:8000';
const vus = Number(__ENV.VUS || 50);
const duration = __ENV.DURATION || '1m';
const cacheId = Number(__ENV.CACHE_ID || 1);

export const options = {
  vus,
  duration,
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`${baseUrl}/items/cache/${cacheId}`);
  check(res, { 'status 200': (r) => r.status === 200 });
}
