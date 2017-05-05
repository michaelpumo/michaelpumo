import { domReady } from './utilities/helpers';
import entry from './modules/entry';
import lazyLoad from './modules/lazy-load';
import form from './modules/form';
import navigation from './modules/navigation';
import inView from './modules/inview';
import scrolling from './modules/scrolling';

import './modules/svg';

require.context('../files/', true, /^\.\/.*\.pdf/);

const app = {

  init() {
    entry();
    lazyLoad();
    form();
    navigation();
    inView();
    scrolling();
  }

};

domReady(app.init);
