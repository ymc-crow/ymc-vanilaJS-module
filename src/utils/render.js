const render = (wrapper, content, pos) => {
  wrapper.insertAdjacentHTML( pos ?? 'beforeend', content);
  return wrapper.lastChild;
};

export default render;