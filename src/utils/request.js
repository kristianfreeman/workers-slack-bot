const parseUrl = request => new URL(request.url);

export const isPost = request => request.method === 'POST';

export const routeMatches = (request, path) => {
  const url = parseUrl(request);
  return url.pathname.includes(path);
};
