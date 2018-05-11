import nodejsUrl from 'url';

const isNull = (obj) => {
  if ('undefined' === typeof obj || obj === null) {
    return true;
  }

  return false;
};

const parseUrlPath = (url) => {
  const parsed = nodejsUrl.parse(url);

  return decodeURIComponent(parsed.pathname);
};

const parseParamStr = (paramStr, isGet) => {
  let params = {};
  const paramPairs = paramStr.split('&');
  for (var i = 0; i < paramPairs.length; i++) {
    const paramPair = paramPairs[i];
    if (paramPair.indexOf('=') === -1) {
      continue;
    }
    const paramPairArray = paramPair.split('=');

    const paramValue = isGet ? decodeURI(paramPairArray[1]) : paramPairArray[1];
    params[paramPairArray[0]] = paramPairArray.length === 2 ? paramValue : null;
  }
  return params;
};

const parseBody = (body) => {
  if ('object' === typeof body) {
    return body;
  }
  try {
    return JSON.parse(body);
  } catch (e) {
    return parseParamStr(body);
  }
};

const parseUrl = (url) => {
  const index = url.indexOf('?');
  const items = index > -1 ? url.split('?') : [url];
  if (items.length === 1) {
    return {
      url: items[0],
      params: {},
    };
  }

  return {
    url: items[0],
    params: parseParamStr(items[1], true),
  };
};

const parseRequest = (url, options = {}) => {
  const urlObj = parseUrl(url);
  const data = parseBody(options.body || {});
  return {
    method: options.method || 'GET',
    url: urlObj.url,
    headers: options.headers,
    params: Object.assign({}, urlObj.params, data),
  };
};

const prueUrl = (url) => {
  const index = url.indexOf('?');
  const result = index > -1 ? url.substring(0, index) : url;
  return result;
};

const matchUrl = (sourceUrl, targetUrl) => {
  sourceUrl = parseUrlPath(sourceUrl);
  targetUrl = parseUrlPath(targetUrl);

  if (sourceUrl === targetUrl) {
    return {
      result: true,
      params: {},
    };
  }

  const sourceUrlSplits = sourceUrl.split('/');
  const targetUrlSplits = targetUrl.split('/');

  if (sourceUrlSplits.length !== targetUrlSplits.length) {
    return {
      result: false,
    };
  }

  let params = {};
  for (let i = 0; i < sourceUrlSplits.length; i++) {
    const sourceUrlSplit = sourceUrlSplits[i];
    const targetUrlSplit = targetUrlSplits[i];
    if (sourceUrlSplit === targetUrlSplit) {
      continue;
    }

    if (sourceUrlSplit.startsWith('{') && sourceUrlSplit.endsWith('}')) {
      if (sourceUrlSplit.replace(/[^{]/g, '').length > 1 || sourceUrlSplit.replace(/[^}]/g, '').length > 1) {
        return {
          result: false,
        };
      }
      // contains url parameter
      params[sourceUrlSplit.substring(1, sourceUrlSplit.length - 1)] = targetUrlSplit;
      continue;
    }
    return {
      result: false,
    };
  }

  return {
    result: true,
    params,
  };
};

const delay = (duration) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

export {
  isNull,
  prueUrl,
  parseUrl,
  parseRequest,
  matchUrl,
  delay,
};
