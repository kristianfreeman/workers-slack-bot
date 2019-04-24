import {lookup, webhook} from './src/routes';
import Router from './router';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let response;

  const r = new Router();
  r.post('/lookup', lookup);
  r.post('/webhook', webhook);

  response = await r.route(request);

  if (!response) {
    response = new Response('Not found', {status: 404});
  }

  return response;
}
