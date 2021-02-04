import ajxc from './ajaxController.js';
import { getResultCache as grc, addResultCache as arc} from './idbController.js'

export const ajaxController = ajxc;
export const getResultCache = grc;
export const addResultCache = arc;