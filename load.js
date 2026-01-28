import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const targetUrl = __ENV.TARGET_URL || 'http://localhost:8000/health';
  http.get(targetUrl);
  sleep(0.1);
}

