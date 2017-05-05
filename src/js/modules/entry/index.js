function init() {
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      const html = document.querySelector('html');
      html.classList.remove('is-loading');
    }, 1000);
  });
}

export default init;
