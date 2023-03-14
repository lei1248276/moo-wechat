// ! 劫持Page再混入方法
const originPage = Page;
Page = function(options) {
  const defaultOptions = {
    onShareAppMessage() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '????'
          });
        }, 2000);
      });
      return {
        title: '???',
        path: '/pages/index/index',
        promise
      };
    },
    onShareTimeline() {
      return {
        title: '????'
      };
    }
  };
  return originPage({ ...defaultOptions, ...options });
};
