Tinytest.add('State - test environment', function(test) {
  var em = new EventState();

  test.instanceOf(em, EventState);
});


Tinytest.addAsync('State - test simple event', function(test, completed) {
  var em = new EventState();
  var counter = 0;

  em.addListener('test', function() {
    counter++;
  });

  test.equal(counter, 0);

  em.emit('test');

  test.equal(counter, 1);

  completed();
});

Tinytest.addAsync('State - test simple state', function(test, completed) {
  var em = new EventState();
  var counter = 0;

  em.addListener('ready', function() {
    counter++;
  });

  test.equal(counter, 0);

  em.emitState('ready');

  test.equal(counter, 1);

  em.addListener('ready', function() {
    // This should trigger just now
    counter++;
  });

  test.equal(counter, 2);

  completed();
});

Tinytest.addAsync('State - test state once', function(test, completed) {
  var em = new EventState();
  var counter = 0;

  em.once('ready', function() {
    counter++;
  });

  test.equal(counter, 0);

  em.emitState('ready');

  test.equal(counter, 1);

  em.emitState('ready');

  test.equal(counter, 1);

  em.once('ready', function() {
    counter++;
  });

  test.equal(counter, 2);

  em.emitState('ready');

  test.equal(counter, 2);

  completed();
});

Tinytest.addAsync('State - test state once value', function(test, completed) {
  var em = new EventState();
  var counter = 0;

  em.once('ready', function(value) {
    test.equal(value, 'ok');
    counter++;
  });

  test.equal(counter, 0);

  em.emitState('ready', 'ok');

  test.equal(counter, 1);

  completed();
});

Tinytest.addAsync('State - test state on value', function(test, completed) {
  var em = new EventState();
  var counter = 0;
  var values = ['ok', 'foo'];

  em.on('ready', function(value) {
    test.equal(value, values[counter]);
    counter++;
  });

  test.equal(counter, 0);

  em.emitState('ready', 'ok');

  test.equal(counter, 1);

  em.emitState('ready', 'foo');

  test.equal(counter, 2);

  completed();
});

Tinytest.addAsync('State - test initial state once', function(test, completed) {
  var em = new EventState({
    'ready': 'ok'
  });

  var counter = 0;
  var values = ['ok', 'foo'];

  test.equal(counter, 0);

  em.once('ready', function(value) {
    test.equal(value, 'ok');
    counter++;
  });

  test.equal(counter, 1);

  em.emitState('ready', 'foo');

  test.equal(counter, 1);

  completed();
});


Tinytest.addAsync('State - test initial state on', function(test, completed) {
  var em = new EventState({
    'ready': 'ok'
  });

  var counter = 0;
  var values = ['ok', 'foo'];

  test.equal(counter, 0);

  em.on('ready', function(value) {
    test.equal(value, values[counter]);
    counter++;
  });

  test.equal(counter, 1);

  em.emitState('ready', 'foo');

  test.equal(counter, 2);

  completed();
});

//Test API:
//test.isFalse(v, msg)
//test.isTrue(v, msg)
//test.equal(actual, expected, message, not)
//test.length(obj, len)
//test.include(s, v)
//test.isNaN(v, msg)
//test.isUndefined(v, msg)
//test.isNotNull
//test.isNull
//test.throws(func)
//test.instanceOf(obj, klass)
//test.notEqual(actual, expected, message)
//test.runId()
//test.exception(exception)
//test.expect_fail()
//test.ok(doc)
//test.fail(doc)
