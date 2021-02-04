const BINDING_CHARACTER = '$';
const createAjaxCacheKey = ({url, stringifyData}) => `${url}${BINDING_CHARACTER}${stringifyData}`;
export default createAjaxCacheKey;