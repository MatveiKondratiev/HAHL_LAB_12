import http from 'k6/http';
import { check } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:8083';
const vus = Number(__ENV.VUS || 200);
const duration = __ENV.DURATION || '2m';

export const options = {
  vus,
  duration,
  thresholds: {
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  const res = http.post(`${baseUrl}/oltp/write?payload=bulk`);
  check(res, { 'status 200': (r) => r.status === 200 });
}
