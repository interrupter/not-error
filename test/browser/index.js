const expect = require('chai').expect,
  notError = require('../../build/error.cjs.js'),
  notErrorReporter = require('../../build/reporter.cjs.js');

window.NOT_NODE_ERROR_KEY = 'error@reporter.local';
window.NOT_NODE_ERROR_URL_BROWSER = 'http://reporter.local/api/key/collect';

describe("browser", function() {
  describe("common", function() {
    it("no options is passed", function() {
      let err = new notError('some error');
      expect(err.message).to.be.equal('some error');
      expect(err).to.be.instanceof(Error);
    });
  });
  describe("error", function() {
    it("no options is passed", function() {
      let err = new notError('some error');
      expect(err.message).to.be.equal('some error');
      expect(err).to.be.instanceof(Error);
    });
  });

  describe("reporter", function() {
    it('packError', function(done) {
      let err = new notError('some error', {
        i: 1
      });
      err.adopt(new Error('not same error'));
      (new notErrorReporter()).packError(err)
        .then((packed) => {
          expect(packed.details.message).to.be.equal('not same error');
          expect(packed.options.i).to.be.equal(1);
          done();
        })
        .catch(done);
    });

    it('getReportURL', function() {
      let URL = (new notErrorReporter()).getReportURL();
      expect(URL).to.be.equal(window.NOT_NODE_ERROR_URL_BROWSER);
    });

    it('reporting', function(done) {
      let code = Math.random();
      window.NOT_NODE_ERROR_URL_BROWSER = 'https://reporter.local/api/key/collect';
      (new notErrorReporter()).report(new notError('Test browser error', {
          code
        }))
        .then(async (response) => {
          let data = await response.json();
          if (response.status == 200) {
            if (data.results[0].options.code == code) {
              done();
            } else {
              done(new Error('Validation code is wrong!'));
            }
          } else {
            done(new Error(data.message));
          }
        })
        .catch(done);
    });
  });

  describe("stack parser", function() {
    it('browser test env stack', (done) => {
      let reporter = new notErrorReporter({});
      const raw = `Error: Test browser error
			    at Context.<anonymous> (/home/cypher/proj/not-lib/not-error/test/browser/index.js:45:36)
					at callFnAsync (/home/cypher/proj/not-lib/not-error/node_modules/mocha/lib/runnable.js:394:21)
					at Test.Runnable.run (/home/cypher/proj/not-lib/not-error/node_modules/mocha/lib/runnable.js:338:7)
					at Runner.runTest (/home/cypher/proj/not-lib/not-error/node_modules/mocha/lib/runner.js:677:10)
					at /home/cypher/proj/not-lib/not-error/node_modules/mocha/lib/runner.js:801:12
					at next (/home/cypher/proj/not-lib/not-error/node_modules/mocha/lib/runner.js:594:14)
					at /home/cypher/proj/not-lib/not-error/node_modules/mocha/lib/runner.js:604:7
					at next (/home/cypher/proj/not-lib/not-error/node_modules/mocha/lib/runner.js:486:14)
					at Immediate._onImmediate (/home/cypher/proj/not-lib/not-error/node_modules/mocha/lib/runner.js:572:5)
					at processImmediate (internal/timers.js:461:21)`;
      let stack = reporter.parseStack(raw);
      expect(stack.line).to.be.equal(45);
      expect(stack.path).to.be.equal('/home/cypher/proj/not-lib/not-error/test/browser');
      expect(stack.file).to.be.equal('index.js');
      expect(stack.function).to.be.equal('anonymous');
      expect(stack.type).to.be.equal('browser');
      done();
    });


    it('browser test env stack 1', (done) => {
      let reporter = new notErrorReporter({});
      const raw1 = `ncInit/<@https://reporter.local/front/root.js:87777:28`;
      let stack = reporter.parseStack(raw1);
      expect(stack.line).to.be.equal(87777);
      expect(stack.path).to.be.equal('https://reporter.local/front');
      expect(stack.file).to.be.equal('root.js');
      expect(stack.function).to.be.equal('ncInit');
      expect(stack.type).to.be.equal('front');
      done();
    });

    it('server test env stack 2', (done) => {
      let reporter = new notErrorReporter({});
      const raw = new Error('test error').stack;
      let stack = reporter.parseStack(raw);
      expect(typeof stack.line).to.be.equal('number');
      expect(stack.path).to.be.equal('/home/cypher/proj/not-lib/not-error/test/browser');
      expect(stack.file).to.be.equal('index.js');
      expect(stack.function).to.be.equal('anonymous');
      expect(stack.type).to.be.equal('browser');
      done();
    });
  });
});
