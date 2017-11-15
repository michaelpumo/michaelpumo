import { domReady } from './utilities/helpers';
import entry from './modules/entry';
import lazyLoad from './modules/lazy-load';
import form from './modules/form';
import navigation from './modules/navigation';
import inView from './modules/inview';
import scrolling from './modules/scrolling';
import confetti from './modules/patterns';

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
    confetti('#pattern-cover', false, true);
    confetti('#pattern-reference', 'cyan');
    confetti('#pattern-availability', 'yellow');
    confetti('#pattern-resume', 'purple');
  }

};

domReady(app.init);
