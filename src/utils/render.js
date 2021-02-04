const render = (wrapper, content) => {
  wrapper.insertAdjacentHTML('beforeend', content);
  return wrapper.lastChild;
};

export default render;