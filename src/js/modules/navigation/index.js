import smoothScroll from 'smooth-scroll';

function toggle() {
  const html = document.querySelector('html');
  html.classList.toggle('has-navigation');
}

function activate() {
  const navButton = document.querySelector('#navigation-activate');

  if (!navButton) {
    return;
  }

  navButton.addEventListener('click', () => {
    toggle();
  });
}

function links() {
  smoothScroll.init({
    selector: '[data-scroll]',
    selectorHeader: null,
    speed: 1000,
    easing: 'easeInOutQuint',
    offset: 0,
    callback(section, link) {
      const grandParent = link.parentNode.parentNode;
      if (grandParent && grandParent.classList.contains('c-navigation__list')) {
        toggle();
      }
    }
  });
}

function init() {
  activate();
  links();
}

export default init;
