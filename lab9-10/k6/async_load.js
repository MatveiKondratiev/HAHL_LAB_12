import http from 'k6/http';
import { check } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:8084';
const rate = Number(__ENV.RATE || 200);
const duration = __ENV.DURATION || '1m';
const preAllocatedVUs = Number(__ENV.VUS || 100);
const maxVUs = Number(__ENV.MAX_VUS || 500);

export const options = {
  scenarios: {
    constant_rate: {
      executor: 'constant-arrival-rate',
      rate,
      timeUnit: '1s',
      duration,
      preAllocatedVUs,
      maxVUs,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`${baseUrl}/async-work`);
  check(res, { 'status 200': (r) => r.status === 200 });
}
