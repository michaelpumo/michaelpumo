import { domReady } from './utilities/helpers';
import { confetti, background } from './modules/patterns';

const app = {

  init() {
    confetti('#pattern-cover');
    background('#pattern-reference', 'cyan');
    background('#pattern-availability', 'yellow');
    background('#pattern-resume', 'purple');
  }

};

domReady(app.init);
