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
  _.each(self.map, function(val, key) {
    // Make sure they are all arrays of arguments _.mapObject
    self.map[key] = _.isArray(val) ? val : [val];
  });
};

// Extend the EventState prototype with EventEmitter
EventState.prototype = Object.create(EventEmitter.prototype);

EventState.prototype.emitState = function(name /* arguments */) {
  var self = this;

  var args = _.toArray(arguments);

  // Set value
  self.map[name] = _.clone(_.rest(args));
  console.log('emitState', arguments, self.map[name]);
  console.log('map', self.map);

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
    console.log('on', name, self.map[name]);
  console.log('map', self.map);
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
    console.log('once', name, self.map[name]);
  console.log('map', self.map);
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
    self.map = _.omit(self.map, name);
  } else {
    // Clear the whole map
    self.map = {};
  }
};


// Add api helpers
EventState.prototype.addListener = EventState.prototype.on;

// Add jquery like helpers
EventState.prototype.one = EventState.prototype.once;
