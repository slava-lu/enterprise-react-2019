import queryString from 'query-string';

const fetchData = async (url, options) => {
  try {
    const fetchResult = await fetch(url, options);
    const data = await handleResponse(fetchResult);
    return {
      response: {
        ok: true,
      },
      data,
    };
  } catch (error) {
    return {
      response: {
        ok: false,
      },
      error: {
        message: error.message,
        status: error.status,
        statusText: error.statusText
      }
    };
  }
};

function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  if ((contentType && contentType.includes('application/json'))) {
    return handleJSONResponse(response);
  }
  if ((contentType && contentType.includes('text/plain')) || contentType.includes('text/html')) {
    return handleTextResponse(response);
  }
  throw new Error(`Sorry, content-type ${contentType} not supported`);
}

function handleJSONResponse(response) {
  return response.json()
    .then((json) => {
      if (response.ok) {
        return json;
      }
      return Promise.reject({
        message: json,
        status: response.status,
        statusText: response.statusText,
      });
    });
}

function handleTextResponse(response) {
  return response.text()
    .then((text) => {
      if (response.ok) {
        return text;
      }
      return Promise.reject({
        message: text,
        status: response.status,
        statusText: response.statusText,
      });
    });
}

export const sendData = (url, method, bodyObj) => fetchData(url, {
  method,
  mode: 'cors',
  cache: 'default',
  redirect: 'follow',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: bodyObj ? JSON.stringify(bodyObj) : null,
});

export const sendDataWithParams = (baseUrl, method, params, bodyObj) => {
  const { url, query } = queryString.parseUrl(baseUrl);
  const newQueryString = queryString.stringify({ ...query, ...params });
  const newURL = newQueryString ? `${url}?${newQueryString}` : url;

  return fetchData(newURL, {
    method,
    mode: 'cors',
    cache: 'default',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: bodyObj ? JSON.stringify(bodyObj) : null,
  });
};
