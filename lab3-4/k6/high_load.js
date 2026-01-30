import http from 'k6/http';
import { check } from 'k6';

const targetUrl = __ENV.TARGET_URL || 'http://localhost:8080/health';
const rate = Number(__ENV.RATE || 1600);
const duration = __ENV.DURATION || '2m';
//VU - Virtual User
const preAllocatedVUs = Number(__ENV.VUS || 200);
const maxVUs = Number(__ENV.MAX_VUS || 1000);

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
  const res = http.get(targetUrl);
  check(res, { 'status 200': (r) => r.status === 200 });
}
