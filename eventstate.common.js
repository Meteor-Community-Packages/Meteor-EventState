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
};

// Extend the EventState prototype with EventEmitter
EventState.prototype = Object.create(EventEmitter.prototype);

EventState.prototype.emitState = function(name, value) {
  var self = this;

  // Set value
  self.map[name] = _.clone(value);

  // Emit change event
  EventEmitter.prototype.emit.call(self, name, value);

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
    listener.call(self, self.map[name]);
  }

  // Return EventState instance
  return self;
};

EventState.prototype.once = function(name, listener) {
  var self = this;

  // Check if state got a value
  if (self.map.hasOwnProperty(name)) {
    // Return the value
    listener.call(self, self.map[name]);
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
