let setLoaderFn;

export const loaderController = {
  init: (fn) => {
    setLoaderFn = fn;
  },
  start: () => {
    if (setLoaderFn) setLoaderFn(true);
  },
  stop: () => {
    if (setLoaderFn) setLoaderFn(false);
  },
};
