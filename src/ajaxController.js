const createUrl = ({ url, method='GET', data }) => {
  if (!data || Object.entries(data).length < 1 || method !== 'GET') return url;
  return `${url}?${Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&')}`;
};

const textResponseParse = async (response) => {
  const text = await response.text();
  try {
    const result = JSON.parse(text);
    // 추가처리 가능
    return result
  } catch(err) {
    console.log('json parse 불가');
    return text;
  }
};

export default class ajaxController {
  constructor(props) {
    this.props = props;
    this.abortController = new AbortController();
  }
  async call() {
      const { abortController, props } = this;
      const { method, data } = props;
      const url = createUrl(props);
      const bodyReq = method === 'POST' ? { body: JSON.stringify(data) } : {};
      try {
          const response = await fetch(url, {
              signal: abortController.signal,
              method,
              headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              },
              ...bodyReq
          });
          const contentType = response.headers.get('content-type');
          if (contentType?.indexOf('application/json') !== -1) return await response.json();
          return await textResponseParse(response);
      }catch(e) {
          return e;
      }
  }
  abort() {
    this.abortController.abort();
  }
};

/// 테스트용코드 test();
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