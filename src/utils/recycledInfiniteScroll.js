import ioFactory from './ioFactory.js';
import {io as lazyIO} from './lazyLoadImageIo.js';
import { ROW_NUM, COLUMN_NUM } from '../list.js';
// IntersectionObserver의 options를 설정합니다.
const options = {
  root: null,
  rootMargin: '-50% 0%',
  threshold: 0
}

const findByKey = (itemObjs, key) => {
  const {listData} = io.extraInfo;
  if (!listData?.[key]) return null;
  const filtered = itemObjs.filter(li => li.props.key === key);
  return filtered?.[0];
};

const itemUpdate = async (target, distance) => {
  if (!target) return;
  const {listData} = io.extraInfo;
  const toKey = target.props.key + distance;
  if (listData?.[toKey]) {
    lazyIO.unobserve(target.dom.querySelector('img'));
    await target.render({key: toKey, item: listData[toKey]});
    lazyIO.observe(target.dom.querySelector('img'));
  }
};

const updateChecker = {};

const update = intersectingAry => {
  const DISTANCE = ROW_NUM * 4;
  const UPDATE_DISTANCE = DISTANCE * 2;
  const {itemObjs} = io.extraInfo;
  const updateCheckerKey = intersectingAry.join(',');
  if (updateChecker[updateCheckerKey] ) return;
  requestAnimationFrame(()=> {
    updateChecker[updateCheckerKey] = false;
  })
  updateChecker[updateCheckerKey] = true;
  for (const item of intersectingAry) {
    const upper = findByKey(itemObjs, item - DISTANCE);
    const under = findByKey(itemObjs, item + DISTANCE);
    itemUpdate(upper, UPDATE_DISTANCE);
    itemUpdate(under, -1 * UPDATE_DISTANCE);
  }
}
// IntersectionObserver 를 등록한다.
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, idx) => {
    // 관찰 대상이 viewport 안에 들어온 경우 image 로드
    if (entry.isIntersecting) {
      const key = parseInt(entry.target.getAttribute('key'));
      const startRow = key - Math.floor(key%4);
      const intersectingAry = Array.apply(null, Array(ROW_NUM)).map((_, i) => startRow + i);
      update(intersectingAry);
    }
  })
}, options);

export default extraInfo => ioFactory(extraInfo, io)