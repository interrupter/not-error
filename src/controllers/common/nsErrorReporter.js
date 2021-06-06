import notErrorReporter from '../../reporter.browser.js';

class nsErrorReporter{
	constructor(app){
		this.app = app;
		this.reporter = new notErrorReporter();
		this.reporter.setOrigin({ server: window.location.host });
	}

	report(e){
		return this.reporter.report(e);
	}
}

export default nsErrorReporter;
