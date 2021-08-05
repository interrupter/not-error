const expect = require('chai').expect,
	path = require('path'),
	http = require('http'),
	https = require('https'),
	pathToConfig = path.join(__dirname, 'config.json'),
	config = require('not-config'),
	notError = require('../../index.js').notError;

let notErrorReporter = new (require('../../index.js').notErrorReporter)();

let configReader =  config.init(pathToConfig);
let NOT_NODE_ERROR_URL_NODE = process.env.NOT_NODE_ERROR_URL_NODE;
let NOT_NODE_ERROR_KEY = process.env.NOT_NODE_ERROR_KEY;
let config_key = configReader.get('modules:error:key');
let config_url = configReader.get('modules:error:url');
describe("node error reporter", function() {
	describe("node", function() {

		beforeEach(()=>{
			notErrorReporter.envFirst = false;
			process.env.NOT_NODE_ERROR_URL_NODE = NOT_NODE_ERROR_URL_NODE;
			process.env.NOT_NODE_ERROR_KEY = NOT_NODE_ERROR_KEY;
			configReader.set('modules:error:key',config_key);
			configReader.set('modules:error:url',config_url);
			configReader.set('modules:error:options', {
				"headers":{
					"X-HEADER-KEY": "fake ID"
				}
			});
		});

		it('set envFirst', function(){
			expect(notErrorReporter.envFirst).to.be.equal(false);
			notErrorReporter.useENV();
			expect(notErrorReporter.envFirst).to.be.equal(true);
		});

		it('selectProto as https from URL without options', function(){
			let mod = notErrorReporter.selectProto('https://location.defined');
			expect(mod).to.be.equal(https);
		})

		it('selectProto as https from URL with options secure=true', function(){
			let mod = notErrorReporter.selectProto('https://location.defined', {secure:true});
			expect(mod).to.be.equal(https);
		})

		it('selectProto as https from URL with options secure=false', function(){
			let mod = notErrorReporter.selectProto('https://location.defined', {secure:false});
			expect(mod).to.be.equal(https);
		})

		it('selectProto as https from URL with options secure=true, and http:// url', function(){
			let mod = notErrorReporter.selectProto('http://location.defined', {secure:true});
			expect(mod).to.be.equal(https);
		})

		it('selectProto as http from URL with options secure=false, and no proto part in url', function(){
			let mod = notErrorReporter.selectProto('/location/api', {secure:false});
			expect(mod).to.be.equal(http);
		})

		it('packError', function(done) {
			let err = new notError('some error', {i: 1});
			err.adopt(new Error('not same error'));
			notErrorReporter.packError(err)
				.then((packed)=>{
					expect(packed.details.message).to.be.equal('not same error');
					expect(packed.options.i).to.be.equal(1);
					done();
				})
				.catch(done);
		});

		it('getReportURL from not-config', function() {
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal('/api/key/collect');
		});

		it('getReportURL from config with envFirst == true', function(){
			notErrorReporter.envFirst = true;
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal('/api/key/collect');
		});

		it('getReportURL from ENV with empty config and envFirst == false', function(){
			configReader.set('modules:error:url','');
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal(process.env.NOT_NODE_ERROR_URL_NODE);
		});

		it('getReportURL from DEFAULT with empty config, envFirst == false, ENVs', function(){
			configReader.set('modules:error:url','');
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal('https://appmon.ru/api/key/collect');
		});

		it('getReportKey from not-config', function() {
			let TEST_KEY = 'test.key';
			configReader.set('modules:error:key', TEST_KEY);
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal(TEST_KEY);
		});

		it('getReportKey from config with envFirst == true', function(){
			notErrorReporter.envFirst = true;
			let TEST_KEY = 'test.key';
			configReader.set('modules:error:key', TEST_KEY);
			process.env.NOT_NODE_ERROR_KEY = '';
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal(TEST_KEY);
		});

		it('getReportKey from ENV with empty config and envFirst == false', function(){
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal(process.env.NOT_NODE_ERROR_KEY);
		});

		it('getReportURL from DEFAULT with empty config, envFirst == false, ENVs', function(){
			configReader.set('modules:error:key','');
			process.env.NOT_NODE_ERROR_KEY = '';
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal('');
		});

		it('reporting success', function(done) {
			let code = Math.random();
			configReader.set('modules:error:options', null);
			notErrorReporter.envFirst = true;
			notErrorReporter.report(new notError('Test node error', {code}), false)
				.then(async (response)=>{
					if(response && response.results && Array.isArray(response.results)){
						let data = response.results;
						if (data[0].options.code == code){
							done();
						}else{
							done(new Error('Validation code is wrong!'));
						}
					}else{
						done(new Error('No results in response'));
					}
				})
				.catch((res)=> {
					done(new Error(res.message, res.statusCode))
				});
		});

		it('reporting failure - Invalid key', function(done) {
			notErrorReporter.envFirst = true;
			process.env.NOT_NODE_ERROR_KEY = '';
			notErrorReporter.report(new notError('Test node error'), false)
				.then((response)=>{
					if(response && response.status === 'error'){
						done();
					}else{
						done(new Error('Response is ok'));
					}
				})
				.catch(async(err)=>{
					try{
						 let res = JSON.parse(err.content);
						 if(err.statusCode == 404 && res.message == 'Invalid key or origin of request'){
	 						done();
	 					}else{
	 						done(err);
	 					}
					}catch(e){
						done(e);
					}
				});
		});

		it('reporting failure - TypeError ERR_INVALID_DOMAIN_NAME', function(done) {
			notErrorReporter.envFirst = true;
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			notErrorReporter.report(new notError('Test node error'), false)
				.then(()=>{
					done(new Error('Response is ok'));
				})
				.catch((err)=>{
					if(err instanceof TypeError && err.code ==='ERR_INVALID_URL'){
						done();
					}else{
						done(err);
					}
				});
		});

		it('reporting failure - TypeError ERR_INVALID_DOMAIN_NAME with notSecure==false', function(done) {
			notErrorReporter.envFirst = true;
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			notErrorReporter.report(new notError('Test node error'), false)
				.then(()=>{
					done(new Error('Response is ok'));
				})
				.catch((err)=>{
					if(err instanceof TypeError && err.code ==='ERR_INVALID_URL'){
						done();
					}
					else{	done(err);}
				});
		});
	});

	describe("node.standalone", function() {
		before(()=>{
			require('not-config').reader = null;
			require('not-config').readerForModule = null;
			delete require.cache[require.resolve('../../index.js')];
			delete require.cache[require.resolve('../../src/reporter.node.js')];

		});

		it('getReportURL from DEFAULT with empty config, envFirst == false, ENVs', function(){
			let notErrorReporterStandalone = require('../../src/reporter.node.js');
			let reporter = new notErrorReporterStandalone({});
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			let URL = reporter.getReportURL();
			expect(URL).to.be.equal('/node/api');
		});

		it('getReportKey from DEFAULT with empty config, envFirst == false, ENVs', function(){
			let notErrorReporterStandalone = require('../../src/reporter.node.js');
			let reporter = new notErrorReporterStandalone({});
			process.env.NOT_NODE_ERROR_KEY = '';
			let KEY = reporter.getReportKey();
			expect(KEY).to.be.equal('test.key');
		});
	});

	describe("stack parser", function(){
		it('browser test env stack', (done)=>{
			let notErrorReporterStandalone = require('../../src/reporter.node.js');
			let reporter = new notErrorReporterStandalone({});
			const raw = `Error: Invalid key or origin of request
     at Function.collect (/var/server/reporter/reporter/node_modules/not-key/src/logics/key.js:39:17)
     at runMicrotasks (<anonymous>)
     at processTicksAndRejections (internal/process/task_queues.js:93:5)
     at async Object.collect (/var/server/reporter/reporter/node_modules/not-key/src/routes/key.js:129:22)
     at async notRoute.executeFunction (/var/server/reporter/reporter/node_modules/not-node/src/manifest/route.js:148:18)
     at async notRoute.executeRoute (/var/server/reporter/reporter/node_modules/not-node/src/manifest/route.js:133:20)`;
			let stack = reporter.parseStack(raw);
			expect(stack.lineNumber).to.be.equal(39);
			expect(stack.filePath).to.be.equal('/var/server/reporter/reporter/node_modules/not-key/src/logics/key.js');
			expect(stack.fileName).to.be.equal('/var/server/reporter/reporter/node_modules/not-key/src/logics/key.js');
			expect(stack.functionName).to.be.equal('collect');
			expect(stack.fileDir).to.be.equal('logics');
			done();
		});

		it('server test env stack', (done)=>{
			let notErrorReporterStandalone = require('../../src/reporter.node.js');
			let reporter = new notErrorReporterStandalone({});
			const raw = new Error('test error').stack;
			let stack = reporter.parseStack(raw);
			expect(typeof stack.lineNumber).to.be.equal('number');
			expect(stack.filePath).to.be.equal('/home/cypher/proj/not-lib/not-error/test/node/reporter.node.js');
			expect(stack.fileName).to.be.equal('/home/cypher/proj/not-lib/not-error/test/node/reporter.node.js');
			expect(stack.functionName).to.be.equal('<anonymous>');
			expect(stack.fileDir).to.be.equal('node');
			done();
		});
	});
});
