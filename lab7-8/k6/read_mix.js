import http from 'k6/http';
import { check } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:8083';
const vus = Number(__ENV.VUS || 50);
const duration = __ENV.DURATION || '1m';
const maxId = Number(__ENV.MAX_ID || 10000);
const replicaRatio = Number(__ENV.REPLICA_RATIO || 0.5);

export const options = {
  vus,
  duration,
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const id = Math.floor(Math.random() * maxId) + 1;
  const useReplica = Math.random() < replicaRatio;
  const path = useReplica ? 'replica' : 'master';
  const res = http.get(`${baseUrl}/oltp/read/${path}/${id}`);
  check(res, { 'status 200': (r) => r.status === 200 });
}
