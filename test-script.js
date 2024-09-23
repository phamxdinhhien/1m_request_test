import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const url = 'http://localhost:3000/order';
  const payload = JSON.stringify({
    customerId: '1234',
    quantity: 1,
  });

  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post(url, payload, params);
  console.log(res.body);
  check(res, { 'status was 200': (r) => r.status === 200 });
}
