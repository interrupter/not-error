import notErrorReporter from '../../reporter.browser.js';

class nsErrorReporter{
	constructor(app){
		this.app = app;
		this.reporter = new notErrorReporter();
		this.reporter.setOrigin({ server: window.location.host });
		this.reporter.setRegisterAll(this.app.getOptions('module.error.registerAll', true));
	}

	report(e){
		return this.reporter.report(e);
	}
}

export default nsErrorReporter;
