function isArray (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

EventState = function(map) {
  var self = this;

  // Make sure we return an instance of EventState
  if (!(self instanceof EventState)) {
    return new EventState(map);
  }

  // Extend with Event emitter
 EventEmitter.call(self);

  // Map of state values
  self.map = map || {};
  for (var key in self.map) {
    var val = self.map[key]
    // Make sure they are all arrays of arguments _.mapObject
    self.map[key] = isArray(val) ? val : [val];
  }
};

// Extend the EventState prototype with EventEmitter
EventState.prototype = Object.create(EventEmitter.prototype);

EventState.prototype.emitState = function(name /* arguments */) {
  var self = this;

  var args = Array.prototype.slice.call(arguments);

  // Set value
  self.map[name] = args.slice(1);

  // Emit change event
  EventEmitter.prototype.emit.apply(self, args);

  // Return EventState instance
  return self;
};

EventState.prototype.on = function(name, listener) {
  var self = this;

  // Add the listener
  EventEmitter.prototype.on.call(self, name, listener);
  // Check if state got a value
  if (self.map.hasOwnProperty(name)) {
    // Return the current value
    listener.apply(self, self.map[name]);
  }

  // Return EventState instance
  return self;
};

EventState.prototype.once = function(name, listener) {
  var self = this;

  // Check if state got a value
  if (self.map.hasOwnProperty(name)) {
    // Return the value
    listener.apply(self, self.map[name]);
  } else {
    // Add the listener
    EventEmitter.prototype.once.call(self, name, listener);
  }

  // Return EventState instance
  return self;
};


EventState.prototype.clearState = function(name) {
  var self = this;

  if (name) {
    // Remove the named state
    var clone = {}
    for (var key in self.map) {
      if (key !== name) {
        clone[key] = self.map[key];
      }
    }
    self.map = clone;
  } else {
    // Clear the whole map
    self.map = {};
  }
};


// Add api helpers
EventState.prototype.addListener = EventState.prototype.on;

// Add jquery like helpers
EventState.prototype.one = EventState.prototype.once;
