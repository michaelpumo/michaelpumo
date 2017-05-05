function display(template) {
  const html = document.querySelector('html');

  window.document.body.insertAdjacentHTML('afterbegin', template);

  window.setTimeout(() => {
    const visibleNotifications = document.querySelectorAll('.c-notification');

    html.classList.add('has-notification');

    Array.from(visibleNotifications).forEach(visibleNotification => {
      visibleNotification.addEventListener('click', () => {
        html.classList.remove('has-notification');
        window.setTimeout(() => {
          visibleNotification.parentNode.removeChild(visibleNotification);
        }, 500);
      });
    });
  }, 500);
}

function notification(heading = '', message = '', emoji = '🚀') {
  const template = `
    <div class="c-notification is-theme-grey-light">
      <div class="c-notification__dialog">
        <p class="c-notification__emoji">${emoji}</p>
        <h3 class="c-notification__heading">${heading}</h3>
        <p class="c-notification__message">${message}</p>
      </div>
    </div>
  `;

  display(template);
}

export default notification;
