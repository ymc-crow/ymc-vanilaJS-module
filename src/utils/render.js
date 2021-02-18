const render = (wrapper, content, pos) => {
  wrapper.insertAdjacentHTML( pos ?? 'beforeend', content);
  return wrapper.lastElementChild;
};

export default render;