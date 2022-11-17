export default {
  install(Vue) {
    Vue.prototype.$loadImage = src => {
      return new Promise(resolve => {
        // document객체는 웹브라우저에서만 활용할 수 있는데 지금은 서버사이드랜더링을 통해 페이지를 만드는 작업을 진행중이라 서버에서는 document객체를 활용할 수 없다.
        // 그래서 if문으로 예외 처리를 한다.
        if (process.server) {
          resolve();
          return;
        }
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          resolve()
        })
      })
    }
  }
}
