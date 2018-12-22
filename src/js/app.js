import { domReady } from './utilities/helpers'
import entry from './modules/entry'
// import lazyLoad from './modules/lazy-load'
import form from './modules/form'
import navigation from './modules/navigation'
import inView from './modules/inview'
import scrolling from './modules/scrolling'
import Confetti from './modules/patterns'

const app = {
  init () {
    entry()
    // lazyLoad()
    form()
    navigation()
    inView()
    scrolling()

    const cover = new Confetti('#pattern-cover', false, true)
    cover.init()

    const reference = new Confetti('#pattern-reference', 'cyan')
    reference.init()

    const availability = new Confetti('#pattern-availability', 'yellow')
    availability.init()

    const resume = new Confetti('#pattern-resume', 'purple')
    resume.init()
  }
}

domReady(app.init)
