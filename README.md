raix:eventstate [![Build Status](https://travis-ci.org/raix/Meteor-EventState.svg)](https://travis-ci.org/raix/Meteor-EventState)
==========

Adds a simple api for maintaining evented state.

This object inherit from the `EventEmitter` and adds two functions to the api:

* `emitState`
* `clearState`

The `EventState` constructor takes an object / map of initial / default state values if any.

### Examples:

```js
  var es = new EventState({
    // Define an initial state with default value
    'initial': { data: 'foo' }
  });

  // Emit a ready state with data of `null`
  es.emitState('ready');

  // Emit an "initial" state with data
  es.emitState('initial', { data: 'foo' });
```

Listening to states:
```js
  es.once('ready', function() {
    // Run once ready / already ready
  });

  es.addListener('initial', function(value) {
    // Get the value and have it kept updated on changes
  });
```

Cleanup listeners and state value for `ready` state:
```js
  // Removes all listeners for event `ready`
  es.removeAllListeners('ready');

  // Empty value map
  es.clearState('ready');
```

Cleanup all listeners and state values:
```js
  // Removes all listeners
  es.removeAllListeners();

  // Empty value map
  es.clearState();
```


Kind regards Morten