import ioFactory from './ioFactory.js';
// IntersectionObserver의 options를 설정합니다.
const options = {
  root: null,
  threshold: 0
};

export const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, idx) => {
   // 관찰 대상이 viewport 안에 들어온 경우 image 로드
   if (entry.isIntersecting) {
     // data-src 정보를 타켓의 src 속성에 설정
     entry.target.src = entry.target.dataset.src;
     // 이미지를 불러왔다면 타켓 엘리먼트에 대한 관찰을 멈춘다.
     // observer.unobserve(entry.target);
   }
 })
}, options);

export default extrainfo => ioFactory(extrainfo, io);