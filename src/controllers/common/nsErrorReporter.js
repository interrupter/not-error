import notErrorReporter from '../../reporter.browser.js';

class nsErrorReporter{
  constructor(app){
    this.app = app;
    this.reporter = new notErrorReporter();
  }

  report(e){
    return this.reporter.report(e);
  }
}

export default nsErrorReporter;
