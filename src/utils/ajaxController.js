import { addResultCache, getResultCache } from './idbController.js';
import createAjaxCacheKey from './createAjaxCacheKey.js';
import getCurrentTime from './getCurrentTime.js';

const RESULT_CACHE_PERIODE = 5000 // 5초

const createUrl = ({ url, method='GET', data }) => {
  if (!data || Object.entries(data).length < 1 || method !== 'GET') return url;
  return `${url}?${Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&')}`;
};

const textResponseParse = async (response) => {
  const text = await response.text();
  try {
    const result = JSON.parse(text);
    // json 형태로 추가처리 가능
    return result
  } catch(err) {
    // json으로 처리 불가
    return text;
  }
};

const getParsedResponse = async response => {
  const contentType = response.headers.get('content-type');
  if (contentType?.indexOf('application/json') !== -1) return await response.json();
  return await textResponseParse(response);
}

export default class ajaxController {
  constructor(props) {
    this.props = props;
    this.abortController = new AbortController();
  }
  async call() {
      const { abortController, props } = this;
      const { url, method='GET', data } = props;
      const stringifyData = JSON.stringify(data);
      const reqUrl = createUrl(props);
      const ajaxCacheKey = createAjaxCacheKey({url,stringifyData});
      const currentTime = getCurrentTime();
      const cachedResult = await getResultCache(ajaxCacheKey);
      if (cachedResult && (currentTime - cachedResult?.timeStamp < RESULT_CACHE_PERIODE)) return cachedResult?.result;
      const bodyReq = method === 'POST' ? { body: stringifyData} : {};
      try {
          const response = await fetch(reqUrl, {
              signal: abortController.signal,
              method,
              headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              },
              ...bodyReq
          });
          const result = await getParsedResponse(response);
          addResultCache(
            {
              keyVal: ajaxCacheKey,
              result,
              timeStamp: getCurrentTime(),
            }
          );
          return result;
      }catch(e) {
          return e;
      }
  }
  abort() {
    this.abortController.abort();
  }
};

/// 테스트용코드 test();
/* 
const test = async () => {
  const reqParam = {
    url: 'https://httpstat.us/200',
    data: {sleep: 5000},
  }
  const testObj = new ajaxController(reqParam);
  setTimeout(() => {
    testObj.abort();
  }, 1000);
  const result = await testObj.call();
  console.log(result);

  const testObj2 = new ajaxController(reqParam);
  console.log(await testObj2.call());
};
*/