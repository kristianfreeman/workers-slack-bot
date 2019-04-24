import {lookup, webhook} from './src/routes';
import {isPost, routeMatches} from './src/utils/request';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let response;

  if (isPost(request) && routeMatches(request, '/lookup')) {
    response = await lookup(request);
  }

  if (isPost(request) && routeMatches(request, '/webhook')) {
    response = await webhook(request);
  }

  if (!response) {
    response = new Response('Not found', {status: 404});
  }

  return response;
}
